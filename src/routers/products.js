// SUB-RUTE MENUJU TABEL PRODUCTS
const productRouter = require("express").Router();

const productHandler = require("../handlers/products");

// localhost:8000/products
// GET
productRouter.get("/", productHandler.getAllProducts);
productRouter.get("/:id", productHandler.getProductById);
// POST
productRouter.post("/", productHandler.addNewProduct);

module.exports = productRouter;
