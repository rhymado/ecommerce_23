require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mainRouter = require("./src/routers");

const app = express();
const port = 8000;

// instalasi parser
app.use(express.urlencoded({ extended: false })); // memasang middleware parsing url-encoded
app.use(express.json()); // memasang middleware parsing raw json
app.use(logger("dev"));

app.use(cors());
app.use(express.static("public"));

// 1. app.use(cors());
// 2. app.options("*")
// 3. buat middleware untuk handle method options
app.use(mainRouter);

// BASE URL => http://localhost:8000
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
