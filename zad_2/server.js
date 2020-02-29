const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const formidable = require("formidable");

const app = express();
app.engine("hbs", hbs({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");

app.use("/public", express.static(path.join(__dirname + "/public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/contact/send-message", (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    const { author, sender, title, message } = fields;
    const { file } = files;
    if (err) {
      console.error("Error", err);
      throw err;
    }
    if (author && sender && title && message && file) {
      res.render("contact", { isSent: true, fileName: file.name });
    } else {
      res.render("contact", { isError: true });
    }
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user/", (req, res, next) => {
  if (false) {
    next();
  } else {
    res.render("forbidden");
  }
});

app.get("/user/settings", (req, res) => {
  res.render("home");
});

app.get("/user/panel", (req, res) => {
  res.render("home");
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
