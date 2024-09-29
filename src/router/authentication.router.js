const express = require("express");
const authenticationController = require("../controller/authentication.controller");


const authenticationRouter = express.Router();

authenticationRouter.post("/token", authenticationController.createToken);
authenticationRouter.post("/logout", authenticationController.logOut);
authenticationRouter.post("/validate", authenticationController.validateToken);

module.exports = authenticationRouter;
