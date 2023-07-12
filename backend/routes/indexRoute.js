const express = require("express");
const router = express.Router();

const loginRoute = require("./loginRoute");
router.use("/login", loginRoute);

const registerRoute = require("./registerRoute");
router.use("/register", registerRoute);

const newsRoute = require("./newsRoute");
router.use("/news", newsRoute);

module.exports=router