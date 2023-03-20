const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const data = require("./data");

app.use(cors({ origin: "*" }));

app.get("/data", (_, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
