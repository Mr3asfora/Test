const express = require("express");
const router = express.Router();

const isAuth = require("../../../middlewares/IsAuth");
const AuthMailController = require("../controllers/AuthMailController");

router.post("/activation", isAuth, AuthMailController.activation);
router.post("/verify", isAuth, AuthMailController.verify);

module.exports = router;
