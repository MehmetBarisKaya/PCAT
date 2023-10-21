const Course = require("../models/courses");
const Category = require("../models/category");

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort("-createdAt");

    const categories = await Category.find();

    res
      .status(200)
      .render("courses", { courses, categories, page_name: "courses" });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render("course", { course, page_name: "courses" });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
