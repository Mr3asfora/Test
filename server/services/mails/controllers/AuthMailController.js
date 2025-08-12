const htmlAuth = require("../components/authMsg");
const sendMail = require("../config");
const AsyncHandler = require("../../../middlewares/AsyncHandler");
const AppError = require("../../../utils/AppError");
const User = require("../../auth/models/User");

const {
  success: { text: successText, code: successCode },
  fail: { text: failText, code: failCode },
} = require("../../../utils/Status");

const activateUserMail = AsyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const { token } = req.cookies;
  const trimmedToken = token.split(" ")[1];

  const codeToMail = req.user.iat.toString().slice(-4);

  const EmailHref = `${process.env.FRONT_URL}/mail/activation?emact=`;

  let headerMail = "تأكيد حسابك علي أنا موجود ♥ ✔";

  sendMail(
    '"🕵️‍♀️ Eslam Fares" <mnEl3asfora@gmail.com>',
    email,
    headerMail + "🔄",
    htmlAuth(
      { HeaderMsg: headerMail },
      {},
      {
        href: `${EmailHref}${trimmedToken}`,
        textHref: `${EmailHref}${trimmedToken.slice(0, 20)}`,
      },
      codeToMail,
      {}
    )
  );

  res.status(successCode).json({
    code: successCode,
    status: successText,
    msg: "لقد أرسلنا رمزاً للتحقق عبر بريدك الإلكتروني",
    email,
  });
});

const verifyUserMail = AsyncHandler(async (req, res, next) => {
  const { code } = req.body;
  const backCode = req.user.iat.toString().slice(-4);

  if (+backCode !== +code) {
    return next(AppError.create(failCode, failText, "الرمز المرسل غير صحيح !"));
  }

  const user = await User.findOne({
    attributes: ["Id", "Email", "isActive"],
    where: { Id: req.user.id },
  });
  if (!user) {
    return next(
      AppError.create(failCode, failText, "هذا المستخدم غير موجود لدينا !")
    );
  }

  if (user.isActive) {
    return next(
      AppError.create(failCode, failText, "هذا المستخدم مفعل بالفعل !")
    );
  }

  user.isActive = true;
  await user.save();

  res.status(successCode).json({
    code: successCode,
    status: successText,
    msg: "تم تفعيل حسابك بنجاح !",
    email: user.Email,
  });
});

module.exports = {
  activation: activateUserMail,
  verify: verifyUserMail,
};
