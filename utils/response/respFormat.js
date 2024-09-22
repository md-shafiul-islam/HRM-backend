const respFormat = (data, message = "", status = false) => {
  return { response: data, message, status };
};

module.exports = respFormat;
