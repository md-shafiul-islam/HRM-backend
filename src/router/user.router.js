const express = require("express");
const userController = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.get("/role/:role", userController.getAllByRole);
userRouter.get("/query", userController.getAllByQuery);
userRouter.get("/:id", userController.getOne);
userRouter.post("/", userController.add);
userRouter.put("/", userController.updateOne);
userRouter.delete("/", userController.deleteOne);

module.exports = userRouter;
