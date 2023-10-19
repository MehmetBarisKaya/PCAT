const express = require("express");
const courseController = require("../controllers/course_controller");

const router = express.Router();

router.route("/").post(courseController.createCourse);
router.route("/").get(courseController.getAllCourses);

module.exports = router;
