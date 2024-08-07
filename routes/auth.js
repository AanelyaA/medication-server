const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.route("/register").post(authController.register);

router.route("/login").post(authController.login);

router.route("/users").get(authController.fetchUser).put(authController.updateUser);

router.route("/refresh").post(authController.refresher);

module.exports = router;
