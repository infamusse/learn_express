const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");

const app = express();
app.engine("hbs", hbs({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");

app.use("/public", express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user/", (req, res, next) => {
  res.render("forbidden");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/info", (req, res) => {
  res.render("info");
});

app.get("/history", (req, res) => {
  res.render("history");
});

app.use((req, res) => {
  res.render("error404");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
