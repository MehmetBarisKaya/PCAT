const express = require("express");
const authController = require("../controllers/auth_controller");
const authMiddleware = require("../middlewares/auth_middleware");

const router = express.Router();

router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);

module.exports = router;
