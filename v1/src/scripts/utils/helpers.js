const cryptoJS = require("crypto-js");

const JWT = require("jsonwebtoken");

const passwordToHash = (password) => {
  return cryptoJS
    .HmacSHA512(
      cryptoJS.HmacSHA512(password, process.env.PASSWORD_HASH).toString(),
      process.env.PASSWORD_HASH
    )
    .toString();
};

const generateAccessToken = (user) => {
  return JWT.sign(
    { ...user, name: user.full_name },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "1W",
    }
  );
};
const generateRefreshToken = (user) => {
  return JWT.sign(
    { ...user, name: user.full_name },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};

module.exports = {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
};
