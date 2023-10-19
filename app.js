const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/course_route");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db").then(() => {
  console.log("DB connected");
});

//Template Engine
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log("Sunucu ${port} portunda başlatıldı..");
});
