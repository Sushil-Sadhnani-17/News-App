const express = require("express");
const router = express.Router();

const {
  getNewsByCategories,
  addNews,
} = require("../controllers/newsController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/get-category-news", verifyToken, getNewsByCategories);
router.post("/add-news", verifyToken, addNews);

module.exports = router;
