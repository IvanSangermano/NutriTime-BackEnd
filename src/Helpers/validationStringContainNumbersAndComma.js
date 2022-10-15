const validationStringContainNumbersAndComma = (value = '') => {
  const regex = /^[0-9]+([.][0-9]+)?$/;
  return regex.test(value);
};
module.exports = validationStringContainNumbersAndComma;
