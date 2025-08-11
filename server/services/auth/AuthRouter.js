const express = require("express");
const router = express.Router();

const AuthValidations = require("./validations/AuthValidations");
const AuthController = require("./AuthController");

router.post("/register", AuthValidations.Register, AuthController.insertUser);
router.post("/login", AuthValidations.Login, AuthController.login);

module.exports = router;
