const express = require("express");
const paymentController = require("../controller/payment.controller");


const paymentRouter = express.Router();

paymentRouter.get("/", paymentController.getAll);
paymentRouter.get("/query", paymentController.getAllByQuery);
paymentRouter.get("/:id", paymentController.getOne);
paymentRouter.post("/", paymentController.add);
paymentRouter.post("/update", paymentController.updateOne);

paymentRouter.put("/", paymentController.updateOne);
paymentRouter.delete("/:id", paymentController.deleteOne);

module.exports = paymentRouter;