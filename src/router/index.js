const express = require("express");
const userRouter = require("./user.router");
const workSheetRouter = require("./work.sheet.router");

function routers(app) {
  app.use("/api/users", userRouter);
  app.use("/api/work-sheets", workSheetRouter);

  app.use("/", (req, resp) => {
    resp.send("ok");
  });
}

module.exports = routers;
