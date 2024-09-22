const express = require("express");

function routers(app) {
  app.use("/", (req, resp) => {
    resp.send("ok");
  });
}

module.exports = routers;
