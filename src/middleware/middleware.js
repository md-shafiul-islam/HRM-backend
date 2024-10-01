const jwt = require("jsonwebtoken");
const respFormat = require("../../utils/response/respFormat");
const { esIsEmpty } = require("../../utils/esHelper");

class EssentialMiddleware {
  isAuthorize = async (req, resp, next) => {
    try {
      const bearerToken = req.headers.authorization;
      let token = undefined;
      if (bearerToken) {
        token = bearerToken?.substring(7);
      }

      if (!token) {
        resp
          .status(401)
          .send(respFormat(null, "Unauthorized access!!!", false));
      } else {
        jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
          if (error || !decode) {
            console.log("Token verify Error ", error.message);
            resp
              .status(401)
              .send(respFormat(null, "Unauthorized access!!", false));
          }

          if (!esIsEmpty(decode)) {
            req.user = decode;
            next();
          }
        });
      }
    } catch (error) {
      console.log("Auth Exception ", error.message);
      resp.status(401).send(respFormat(null, "Unauthorized access!!", false));
    }
  };
}

const esMiddleware = new EssentialMiddleware();

module.exports = esMiddleware;
