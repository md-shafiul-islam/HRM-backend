const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");
const { esIsEmpty } = require("../../utils/esHelper");
const { use } = require("../router/user.router");

class UtilServices {
  stin2Bool = (isVal) => {
    if (isVal === "true") {
      return true;
    }
    if (isVal === "false") {
      return false;
    }

    return isVal;
  };
}

const utilServices = new UtilServices();

module.exports = utilServices;
