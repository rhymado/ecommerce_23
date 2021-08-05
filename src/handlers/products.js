const productsModel = require("../models/products");
const responseHelper = require("../helpers/response");

const getAllProducts = (req, res) => {
  const { query } = req;
  productsModel
    .getAllProducts(query)
    .then(({ data, count, currentPage, limit }) => {
      // info => jumlah data, halaman berapa sekarang, total halaman, link halaman berikutnya, link halaman sebelumnya
      // #data    10 9 8 7
      // limit    5  5 5 3
      // #halaman 2  2 2 3
      // #halaman = ROUNDUP(#data / limit)
      // localhost:8000/products?page=page+1&limit=limit
      const baseURL = "http://localhost:8000/products";
      const totalData = count[0].total_data;
      const totalPage = Math.ceil(totalData / limit);
      // ternary operator
      // shorthand dari bentuk if
      // if (kondisi){if true} else {if false}
      // kondisi ? if true : if false
      const prevPage =
        currentPage > 1
          ? baseURL + `?page=${currentPage - 1}&limit=${limit}`
          : null;
      const nextPage =
        currentPage < totalPage
          ? baseURL + `?page=${currentPage + 1}&limit=${limit}`
          : null;
      const info = {
        totalData,
        currentPage,
        totalPage,
        nextPage,
        prevPage,
      };
      responseHelper.success(res, 200, data, info);
    })
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
