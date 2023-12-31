const bcrypt = require("bcrypt");
const User = require("../models/user");
const Category = require("../models/category");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    // res.status(201).json({
    //   status: "success",
    //   user,
    // });
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //mongoose 6
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, same) {
        if (same) {
          // USER SESSION
          req.session.userID = user._id;
          res.status(200).redirect("/users/dashboard");
        } else {
          //  req.flash("error", "Your password is not correct!");
          //res.status(400).redirect("/login");
        }
      });
    } else {
      //req.flash("error", "User is not exist!");
      res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
  });
};
