const express = require("express");
const userController = require("../controller/user.controller");
const esMiddleware = require("../middleware/middleware");

const userRouter = express.Router();

userRouter.get("/", esMiddleware.isAuthorize, userController.getAll);
userRouter.get(
  "/role/:role",
  esMiddleware.isAuthorize,
  userController.getAllByRole
);
userRouter.get(
  "/query",
  esMiddleware.isAuthorize,
  userController.getAllByQuery
);
userRouter.get("/:id", esMiddleware.isAuthorize, userController.getOne);
userRouter.get("/:id/payments", esMiddleware.isAuthorize, userController.getUserAllPayment);
userRouter.post("/", userController.add);
userRouter.patch("/", userController.updateOnly);
userRouter.put("/", esMiddleware.isAuthorize, userController.updateOne);
userRouter.delete("/", esMiddleware.isAuthorize, userController.deleteOne);

module.exports = userRouter;
