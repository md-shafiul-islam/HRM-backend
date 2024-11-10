const express = require("express");
const esMiddleware = require("../middleware/middleware");
const contactUsController = require("../controller/contact.us.controller");

const contactUsRouter = express.Router();

contactUsRouter.get("/", esMiddleware.isAuthorize, contactUsController.getAll);
contactUsRouter.get(
  "/query",
  esMiddleware.isAuthorize,
  contactUsController.getAllByQuery
);
contactUsRouter.get(
  "/:id",
  esMiddleware.isAuthorize,
  contactUsController.getOne
);
contactUsRouter.post("/", contactUsController.add);

contactUsRouter.put(
  "/",
  esMiddleware.isAuthorize,
  contactUsController.updateOne
);
contactUsRouter.delete(
  "/:id",
  esMiddleware.isAuthorize,
  contactUsController.deleteOne
);

module.exports = contactUsRouter;
