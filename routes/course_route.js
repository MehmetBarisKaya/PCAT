const express = require("express");
const courseController = require("../controllers/course_controller");
const roleMiddleware = require("../middlewares/role_middleware");

const router = express.Router();

router
  .route("/")
  .post(roleMiddleware(["teacher", "admin"]), courseController.createCourse);
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);

module.exports = router;
