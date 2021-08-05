// SUB-RUTE MENUJU TABEL PRODUCTS
const productRouter = require("express").Router();

const productHandler = require("../handlers/products");
const authMiddleware = require("../middlewares/auth");

// localhost:8000/products
// GET
productRouter.get(
  "/",
  // authMiddleware.checkToken,
  productHandler.getAllProducts
);
productRouter.get("/:id", productHandler.getProductById);
// POST
productRouter.post("/", productHandler.addNewProduct);

module.exports = productRouter;
