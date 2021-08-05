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
const userRouter = require("./users");
const authRouter = require("./auth");

mainRouter.use("/", pingRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
