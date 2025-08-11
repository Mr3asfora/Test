const { check } = require("express-validator");

module.exports = {
  Register: [
    check("name")
      .notEmpty()
      .withMessage('! حقل " الإسم الأول " مطلوب _*')
      .matches(/^([\u0600-\u06FF\u0750-\u077F]|[a-zA-Z])/)
      .withMessage("الإسم - : يجب أن يحتوي علي أحرف فقط _*")
      .isLength({ min: 4, max: 100 })
      .withMessage("الإسم - : يجب أن يكون من بين 4 - 100 أحرف علي الأكثر _*")
      .trim()
      .toLowerCase(),
    check("email")
      .notEmpty()
      .withMessage('! حقل " البريد الإلكتروني " مطلوب _*')
      .not()
      .matches("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/")
      .withMessage("البريد الإلكتروني : غير مُصَرح به! _*")
      .trim()
      .toLowerCase(),
    check("password")
      .notEmpty()
      .withMessage('! حقل " كلمة المرور " مطلوب _*')
      .not()
      .matches("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/i")
      .withMessage(
        'كلمة المرور لابد ان تحتوي من 8 لـ 15 > " 4 أحرف يتضمنوا حرف كبير ، 2 أرقام ، 2 رموز " علي الأقل _*'
      )
      .trim(),
    check("rPassword")
      .notEmpty()
      .withMessage('! حقل " تأكيد كلمة المرور " مطلوب _*')
      .not()
      .matches("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/i")
      .withMessage(
        'كلمة المرور لابد ان تحتوي من 8 لـ 15 > " 4 أحرف يتضمنوا حرف كبير ، 2 أرقام ، 2 رموز " علي الأقل _*'
      )
      .trim(),
  ],
  Login: [
    check("emOruName")
      .notEmpty()
      .withMessage('! حقل " البريد الإلكتروني | اسم المستخدم " مطلوب _*')
      .trim()
      .toLowerCase(),
    check("password")
      .notEmpty()
      .withMessage('! حقل " كلمة المرور " مطلوب _*')
      .trim(),
  ],
};
