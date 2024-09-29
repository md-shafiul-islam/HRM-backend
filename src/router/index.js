const express = require("express");
const userRouter = require("./user.router");
const workSheetRouter = require("./work.sheet.router");
const taskRouter = require("./task.router");
const paymentRouter = require("./payment.router");
const authenticationRouter = require("./authentication.router");

function routers(app) {
  app.use("/api/users", userRouter);
  app.use("/api/work-sheets", workSheetRouter);
  app.use("/api/tasks", taskRouter);
  app.use("/api/payments", paymentRouter);
  app.use("/api/auth", authenticationRouter);

  app.use("/", (req, resp) => {
    resp.send("ok");
  });
}

module.exports = routers;
