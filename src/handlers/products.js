const productsModel = require("../models/products");
const responseHelper = require("../helpers/response");

const getAllProducts = (req, res) => {
  productsModel
    .getAllProducts()
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
  //   queryPromise
  //     .then((data) => res.status(200).json(data))
  //     .catch((err) => res.status(500).json(err));
};

const addNewProduct = (req, res) => {
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
  productsModel
    .createProduct(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
  //   queryPromise.then((data) => res.json(data)).catch((err) => res.json(err));
};

// path params, query params

// path params
// get product by id
// /product/1
// /product/2
const getProductById = (req, res) => {
  const { params } = req;
  productsModel
    .getProductById(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
  //   queryPromise
  //     .then((data) => res.status(200).json(data))
  //     .catch((err) => res.status(500).json(err));
};

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductById,
};
