const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // ilk eleman "Bearer" yazısı olduğu için ikinci eleman tokendir
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res
    .status(httpStatus.UNAUTHORIZED)
    .send({ error: "Token girişi yapılmamış" });
  }
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(httpStatus.FORBIDDEN).send({ error });
    }
    req.user = user?._doc;
    next();
  });
};

module.exports = authenticate;
