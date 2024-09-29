const jwt = require("jsonwebtoken");

class AuthenticationServices {
  createAuthToken = async (user) => {
    try {
      return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });
    } catch (error) {
      return null;
    }
  };
}

const authenticationServices = new AuthenticationServices();

module.exports = authenticationServices;
