// SUB-RUTE MENUJU TABEL USERS
const userRouter = require("express").Router();

const userHandler = require("../handlers/users");
const upload = require("../middlewares/upload");

// localhost:8000/users
userRouter.patch("/:id", upload.single("image"), userHandler.editUser);
userRouter.patch("/password/:id", userHandler.updatePassword);

module.exports = userRouter;
