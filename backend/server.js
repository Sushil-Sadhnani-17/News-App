require("dotenv").config();

const express = require("express");const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors())

const indexRouter = require("./routes/indexRoute");
app.use("/api", indexRouter);

const cron = require("node-cron");
const { fetchAndStoreNews } = require("./scripts/fetchNews");
// fetchAndStoreNews();
cron.schedule("0 * * * *", () => {
  fetchAndStoreNews();
});

app.listen(5000, () => {
    console.log("App Running");
})