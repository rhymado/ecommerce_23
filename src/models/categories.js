const db = require("../database/mysql");

const findCategory = (inputValue) => {
  return new Promise((resolve, reject) => {
    let queryString = "SELECT * FROM categories WHERE name_ina LIKE ?";
    //   if (query?.order) queryString += " ORDER BY ? ?";
    db.query(queryString, inputValue, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  findCategory,
};
