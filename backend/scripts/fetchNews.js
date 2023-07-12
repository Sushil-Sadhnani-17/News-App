const axios = require("axios");
const { connection } = require("../middleware/database");

const storeNewsInDatabase = async (newsData, category) => {
  try {
    for (const news of newsData) {
      const sql = `
        INSERT INTO news
        (source, title, description, url, urlToImage, publishedAt, content, language, category, country)
        VALUES ("${news.source.name}", "${news.title?.replace(/"/g,'\\"')}", 
        "${news.description?.replace(/"/g, '\\"').substring(0, 255)}", "${news.url}", "${news.urlToImage}", 
        "${news.publishedAt}", "${news.content?.replace(/"/g, '\\"').substring(0, 65000)}", 
        "english", '${category}', "in")`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  } catch (error) {
    console.error("Error storing news data:", error);
    throw error;
  }
};

const fetchAndStoreNews = async () => {
  try {
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const headers = {
        'x-api-key' : process.env.NEWSAPI_KEY
      };
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=1&pageSize=100`,
        {
          headers
        }
      );
      const newsData = response.data.articles;
      await storeNewsInDatabase(newsData, category);
      
    }
    console.log("All news data fetched and stored.");
  } catch (error) {
    console.error("Error fetching or storing news data:", error);
  }
};

module.exports = { fetchAndStoreNews };
