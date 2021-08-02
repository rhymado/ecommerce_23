// RUTE UTAMA
const mainRouter = require("express").Router();
// const router = express.Router();

/**
 * ADA 3 SUB-ROUTER
 * 1. ping => /
 * 2. products => /products
 * 3. category => /category
 */

const pingRouter = require("./ping");
const productRouter = require("./products");
const categoryRouter = require("./categories");

mainRouter.use("/", pingRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/categories", categoryRouter);

module.exports = mainRouter;
