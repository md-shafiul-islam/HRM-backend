const express = require("express");
const taskController = require("../controller/task.controller");
const esMiddleware = require("../middleware/middleware");

const taskRouter = express.Router();
taskRouter.get("/", esMiddleware.isAuthorize, taskController.getAll);
taskRouter.get(
  "/query",
  esMiddleware.isAuthorize,
  taskController.getAllByQuery
);
taskRouter.get("/:id", esMiddleware.isAuthorize, taskController.getOne);
taskRouter.post("/", esMiddleware.isAuthorize, taskController.add);
taskRouter.post("/update", esMiddleware.isAuthorize, taskController.updateOne);

taskRouter.put("/", esMiddleware.isAuthorize, taskController.updateOne);
taskRouter.delete("/:id", esMiddleware.isAuthorize, taskController.deleteOne);

module.exports = taskRouter;
