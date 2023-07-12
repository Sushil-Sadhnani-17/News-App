const { connection } = require("../middleware/database");

const getNewsByCategories = async (req, res, next) => {
  const { category, page, pageSize, language, country } = req.query;
  const sql = `SELECT * FROM news WHERE category = '${category}' and language = '${language}' and country= '${country}' 
  limit ${pageSize} offset ${(page - 1) * pageSize};
  SELECT COUNT(*) as total_count FROM news WHERE category = '${category}' and language = '${language}' and country= '${country}';`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: false, message: err });
      return;
    }
    res.status(200).json({ status: true, news: result[0], total_count: result[1] });
  });
};

const addNews = async (req, res, next) => {
  const {
    source,
    title,
    description,
    url,
    content,
    language,
    category,
    country,
    imageUrl,
  } = req.body;
  const date = new Date(); // Create a new Date object
  const publishedAt = date.toISOString().slice(0, 19).replace("T", " ");
  const sql = `INSERT INTO news (source, author, title, description, url, imageUrl, publishedAt, content, language, category_id, country)
     VALUES 
    ('${source}', 'ADMIN', '${title}', '${description}', '${url}', '${imageUrl}', '${publishedAt}', '${content}', '${language}', '${category}', '${country}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.status(200).json({ message: "News Added successfully." });
  });
};

module.exports = {
  getNewsByCategories,
  addNews
};
