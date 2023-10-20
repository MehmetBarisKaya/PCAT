const express = require("express");
const pageController = require("../controllers/page_controller");

const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(pageController.getRegiserPage);
router.route("/login").get(pageController.getLoginPage);

module.exports = router;
