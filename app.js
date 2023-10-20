const express = require("express");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/course_route");
const categoryRoute = require("./routes/category_route");
const userRoute = require("./routes/user_route");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db").then(() => {
  console.log("DB connected");
});

//Template Engine
app.set("view engine", "ejs");

//Global Variable

global.userIN = null;

//MIDDLEWARES
app.use(
  session({
    secret: "my_keyboard_cat", // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/pcat-test-db",
    }),
  })
);
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//ROUTES
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log("Sunucu ${port} portunda başlatıldı..");
});
