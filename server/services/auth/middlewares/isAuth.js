const jwt = require("jsonwebtoken");

const {
  unAuth: { code: unAuthCode, text: unAuthText },
} = require("../../../utils/Status");
const AppError = require("../../../utils/AppError");

const isAuth = (req, res, next) => {
  const getToken =
    req.headers.authorization || req.headers.Authorization || req.cookies.token;
  if (!getToken) {
    return next(
      AppError.create(unAuthCode, unAuthText, "*_ الرقم التعريفي مطلوب ! _*")
    );
  }
  const token = getToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return next(
      AppError.create(unAuthCode, unAuthText, "*_ الرقم التعريفي غير صالح ! _*")
    );
  }
};

module.exports = isAuth;
