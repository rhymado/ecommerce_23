// SUB-RUTE UNTUK TABEL CATEGORIES
const categoryRouter = require("express").Router();

const categoryHandler = require("../handlers/categories");

categoryRouter.get("/", categoryHandler.findCategory);

module.exports = categoryRouter;
