const jwt = require("jsonwebtoken");
const { esIsEmpty } = require("../utils/esHelper");
const respFormat = require("../utils/response/respFormat");

class EssentialMiddleware {
  isAuthorize = async (req, resp, next) => {
    const token = req.cookies?.token;

    if (!token) {
      resp.status(401).send(respFormat(null, "Unauthorized access!!!", false));
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
      if (error) {
        resp.status(401).send(respFormat(null, "Unauthorized access!!", false));
      }

      if (decode) {
        req.user = decode;
      } else {
        resp.status(401).send(respFormat(null, "Unauthorized access!", false));
      }
    });
    next();
  };
}

const esMiddleware = new EssentialMiddleware();

module.exports = esMiddleware;
