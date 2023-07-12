import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setLoading(true);
    const newsAppData = JSON.parse(localStorage.getItem("newsAppData"));
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + newsAppData.token,
      },
    };
    props.setProgress(10);
    fetch(`http://localhost:5000/api/news/get-category-news?category=${props.category}&language=${props.language}&country=${props.country}&pageSize=${props.pageSize}&page=1`, options)
      .then((response) => {
        props.setProgress(30);
        return response.json();
      })
      .then((responseJson) => {
        props.setProgress(70);
        if (!responseJson.status) {
          alert(responseJson.message);
          throw new Error("Something went wrong");
        }
        setArticles(responseJson.news);
        setTotalResults(responseJson.total_count[0].total_count);
      })
      .catch((error) => {
        console.log(error);
      });
      setLoading(false)
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News App`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const newsAppData = JSON.parse(localStorage.getItem("newsAppData"));
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + newsAppData.token,
      },
    };
    fetch(`http://localhost:5000/api/news/get-category-news?category=${props.category}&language=${props.language}&country=${props.country}&pageSize=${props.pageSize}&page=${page + 1}`, options)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (!responseJson.status) {
          alert(responseJson.message);
          throw new Error("Something went wrong");
        }
        setPage(page + 1);
        setArticles(articles.concat(responseJson.news));
        setTotalResults(responseJson.total_count[0].total_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        News App - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element?.url}>
                  <NewsItem
                    title={element?.title ? element?.title : ""}
                    description={
                      element?.description ? element?.description : ""
                    }
                    imageUrl={element?.urlToImage}
                    newsUrl={element?.url}
                    author={element?.author}
                    date={element?.publishedAt}
                    source={element?.source?.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
