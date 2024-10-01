const jwt = require("jsonwebtoken");

class AuthenticationServices {
  createAuthToken = async (user) => {
    const { _id, autId, designation, bank_account_no, salary, ...nUser } = user;
    try {
      return jwt.sign(nUser, process.env.SECRET_KEY, { expiresIn: "1h" });
    } catch (error) {
      return null;
    }
  };
}

const authenticationServices = new AuthenticationServices();

module.exports = authenticationServices;
