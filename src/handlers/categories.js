const categoriesModel = require("../models/categories");
const responseHelper = require("../helpers/response");
// query params
// ?key=value&key=value
// find category
const findCategory = (req, res) => {
  const { query } = req;
  // query => object
  let inputValue = `%${query.category_name || ""}%`;
  categoriesModel
    .findCategory(inputValue)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
  //   queryPromise.then((data) => res.json(data)).catch((err) => res.json(err));
};

module.exports = {
  findCategory,
};
