const express = require("express");
const workSheetController = require("../controller/work.sheet.controller");

const workSheetRouter = express.Router();

workSheetRouter.get("/", workSheetController.getAll);
workSheetRouter.get("/query", workSheetController.getAllByQuery);
workSheetRouter.get("/:id", workSheetController.getOne);
workSheetRouter.post("/", workSheetController.add);
workSheetRouter.post("/update", workSheetController.updateOne);

workSheetRouter.put("/", workSheetController.updateOne);
workSheetRouter.delete("/:id", workSheetController.deleteOne);

module.exports = workSheetRouter;
