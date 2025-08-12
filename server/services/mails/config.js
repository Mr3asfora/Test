const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE, // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: "SSLv3",
  },
});

const sendMail = async (from, to, subject, html) => {
  const info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html,
  });

  return info;
};

module.exports = sendMail;
