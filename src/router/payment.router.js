const express = require("express");
const taskController = require("../controller/task.controller");


const taskRouter = express.Router();

taskRouter.get("/", taskController.getAll);
taskRouter.get("/query", taskController.getAllByQuery);
taskRouter.get("/:id", taskController.getOne);
taskRouter.post("/", taskController.add);
taskRouter.post("/update", taskController.updateOne);

taskRouter.put("/", taskController.updateOne);
taskRouter.delete("/:id", taskController.deleteOne);

module.exports = taskRouter;