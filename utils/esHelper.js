const isNumber = require("is-number");

/**
 * @method isEmpty  function
 * @param {String | Number | Object} obj
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const esIsEmpty = (obj) => {
  if (obj === undefined && obj === null) {
    return true;
  }

  if (typeof obj === "undefined" || typeof obj == null) {
    return true;
  }

  if (
    obj === null ||
    obj === undefined ||
    typeof obj === "undefined" ||
    obj === "" ||
    typeof obj == null
  ) {
    return true;
  }

  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }

  if (Array.isArray(obj)) {
    if (obj.length > 0) {
      return false;
    }

    return true;
  }

  if (obj) {
    return false;
  }

  return true;
};

const esGetNumber = (value) => {
  let num = 0;
  if (!esIsEmpty(value)) {
    num = Number(value);
    num = isNumber(num) ? num : 0;
  }

  return num;
};

const esSubText = (text, size = 20) => {
  if (!esIsEmpty(text)) {
    if (text.length > size) {
      text = `${text.substring(0, size)} [...]`;
    }
  }

  return text;
};

module.exports = { esGetNumber, esIsEmpty, esSubText };
