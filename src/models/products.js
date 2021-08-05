const db = require("../database/mysql");

const getAllProducts = (query) => {
  return new Promise((resolve, reject) => {
    // PAGE(p)   1 2 3 4
    // LIMIT(l)  3 3 3 3
    // OFFSET(o) 0 3 6 9
    // OFFSET = LIMIT * (PAGE - 1)
    // jangan lupa dikasih default value
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 3;
    const offset = limit * (page - 1);
    const countQs = 'SELECT COUNT(*) AS "total_data" FROM products';
    const queryString =
      'SELECT p.id, p.name AS "product_name", p.price, c.name_ina AS "id_category_name", c.name_en AS "en_category_name", u.name AS "Seller" FROM products p JOIN categories c ON p.category_id = c.id JOIN users u ON p.user_id = u.id LIMIT ? OFFSET ?';
    db.query(queryString, [limit, offset], (error, resultGet) => {
      if (error) return reject(error);
      db.query(countQs, (err, resultCount) => {
        if (err) return reject(err);
        return resolve({
          data: resultGet,
          count: resultCount,
          currentPage: page,
          limit,
        });
      });
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
