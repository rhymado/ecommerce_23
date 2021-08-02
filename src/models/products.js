const db = require("../database/mysql");

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const queryString =
      'SELECT p.id, p.name AS "product_name", p.price, c.name_ina AS "id_category_name", c.name_en AS "en_category_name", u.name AS "Seller" FROM products p JOIN categories c ON p.category_id = c.id JOIN users u ON p.user_id = u.id';
    db.query(queryString, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

const createProduct = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO products SET ?";
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const queryString =
      'SELECT p.id, p.name AS "product_name", p.price, c.name_ina AS "id_category_name", c.name_en AS "en_category_name", u.name AS "Seller" FROM products p JOIN categories c ON p.category_id = c.id JOIN users u ON p.user_id = u.id WHERE p.id = ?';
    db.query(queryString, id, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};
