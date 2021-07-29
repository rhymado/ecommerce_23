require("dotenv").config();
const express = require("express");
const logger = require("morgan");

const app = express();
const port = 8000;

// instalasi parser
app.use(express.urlencoded({ extended: false })); // memasang middleware parsing url-encoded
app.use(express.json()); // memasang middleware parsing raw json
app.use(logger("dev"));

// BASE URL => http://localhost:8000
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});

// http://localhost:8000/
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const mysql = require("mysql");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
// console.log(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

app.get("/products", (req, res) => {
  const queryString =
    'SELECT p.id, p.name AS "product_name", p.price, c.name_ina AS "id_category_name", c.name_en AS "en_category_name", u.name AS "Seller" FROM products p JOIN categories c ON p.category_id = c.id JOIN users u ON p.user_id = u.id';
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
  queryPromise
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

app.post("/products", (req, res) => {
  const { body } = req;
  // key = name, price, user_id, category_id
  /* body
   * {
   *    name,
   *    price,
   *    category_id,
   *    user_id
   * }
   */
  const queryString = "INSERT INTO products SET ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
  queryPromise.then((data) => res.json(data)).catch((err) => res.json(err));
});

// path params, query params

// path params
// get product by id
// /product/1
// /product/2
app.get("/products/:id", (req, res) => {
  const { params } = req;
  const queryString =
    'SELECT p.id, p.name AS "product_name", p.price, c.name_ina AS "id_category_name", c.name_en AS "en_category_name", u.name AS "Seller" FROM products p JOIN categories c ON p.category_id = c.id JOIN users u ON p.user_id = u.id WHERE p.id = ?';
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, params.id, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
  queryPromise
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

// query params
// ?key=value&key=value
// find category
app.get("/categories", (req, res) => {
  const { query } = req;
  // query => object
  let queryString = "SELECT * FROM categories WHERE name_ina LIKE '%?%'";
  let inputValue = "";
  if (query?.category_name) inputValue = query.category_name;
  //   if (query?.order) queryString += " ORDER BY ? ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, mysql.raw(inputValue), (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
  queryPromise.then((data) => res.json(data)).catch((err) => res.json(err));
});
