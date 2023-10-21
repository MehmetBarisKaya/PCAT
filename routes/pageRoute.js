const express = require("express");
const pageController = require("../controllers/page_controller");
const redirectMiddleware = require("../middlewares/redirect_middleware");

const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router
  .route("/register")
  .get(redirectMiddleware, pageController.getRegiserPage);
router.route("/login").get(redirectMiddleware, pageController.getLoginPage);

module.exports = router;
