const AsyncHundler = require("./middlewares/AsyncHundler");

const { validationResult } = require("express-validator");

const { Op } = require("sequelize");

const genToken = require("../../utils/GenToken");
const bcrypt = require("bcryptjs");

const AppError = require("../../utils/AppError");
const {
  success: { text: successText, code: successCode },
  fail: { text: failText, code: failCode },
  bad: { text: badText, code: badCode },
} = require("../../utils/Status");

const User = require("./User");

const insertNewUser = AsyncHundler(async (req, res, next) => {
  const { name, email, password, rPassword } = req.body;

  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    return next(AppError.create(badCode, badText, Errors.array()));
  }

  const foundedUser = await User.findOne({
    attributes: ["Email"],
    where: { Email: email },
  });

  if (foundedUser) {
    return next(
      AppError.create(failCode, failText, "البريد الإلكتروني موجود بالفعل!")
    );
  }

  if (password !== rPassword) {
    return next(AppError.create(badCode, badText, "كلمة المرور غير متطابقة"));
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const matchedCode = hashedPassword.match(/[a-zA-Z]/gi).join("");
  const usernameSlice =
    matchedCode.slice(5, 9) + Date.now().toString().slice(-3);

  if (foundedUser?.Username === usernameSlice) {
    return next(
      AppError.create(failCode, failText, " هذا المستخدم موجود بالفعل !")
    );
  }

  const newUser = await User.create({
    Name: name,
    Email: email,
    Password: hashedPassword,
    Username: usernameSlice,
  });

  const token = genToken(
    {
      id: newUser.Id,
      username: newUser.Username,
      email: newUser.Email,
      role: newUser.Role,
    },
    "10m"
  );

  res.status(successCode).json({
    code: successCode,
    status: successText,
    message: "تم إنشاء المستخدم بنجاح !",
    token,
  });
});

const loginUser = AsyncHundler(async (req, res, next) => {
  const { emOruName, password } = req.body;

  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    return next(AppError.create(failCode, failText, Errors.array()));
  }

  const foundedUser = await User.findOne({
    attributes: ["Email", "Username", "Password", "isActive"],
    where: { [Op.or]: [{ Email: emOruName }, { Username: emOruName }] },
  });

  if (!foundedUser) {
    return next(AppError.create(failCode, failText, failText));
  }

  const isMatched = await bcrypt.compare(password, foundedUser.Password);

  if (!isMatched) {
    return next(AppError.create(failCode, failText, failText));
  }

  const token = genToken(
    {
      id: foundedUser.Id,
      username: foundedUser.Username,
      email: foundedUser.Email,
      role: foundedUser.Role,
    },
    "10m"
  );

  res.cookie("token", `Bearer ${token}`, {
    httpOnly: true,
    secure: true,
  });

  if (!foundedUser.isActive) {
    return res.status(failCode).json({
      code: failCode,
      status: failText,
      message: "البريد الإلكتروني غير مفعل !",
      token,
    });
  }

  res.status(successCode).json({
    code: successCode,
    status: successText,
    message: "تم تسجيل الدخول بنجاح !",
    token,
  });
});

module.exports = {
  insertUser: insertNewUser,
  login: loginUser,
};
