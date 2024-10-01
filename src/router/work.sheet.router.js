const express = require("express");
const workSheetController = require("../controller/work.sheet.controller");
const esMiddleware = require("../middleware/middleware");

const workSheetRouter = express.Router();

workSheetRouter.get("/", esMiddleware.isAuthorize, workSheetController.getAll);
workSheetRouter.get(
  "/query",
  esMiddleware.isAuthorize,
  workSheetController.getAllByQuery
);
workSheetRouter.get(
  "/:id",
  esMiddleware.isAuthorize,
  workSheetController.getOne
);
workSheetRouter.post("/", esMiddleware.isAuthorize, workSheetController.add);
workSheetRouter.post(
  "/update",
  esMiddleware.isAuthorize,
  workSheetController.updateOne
);

workSheetRouter.put(
  "/",
  esMiddleware.isAuthorize,
  workSheetController.updateOne
);
workSheetRouter.delete(
  "/:id",
  esMiddleware.isAuthorize,
  workSheetController.deleteOne
);

module.exports = workSheetRouter;
