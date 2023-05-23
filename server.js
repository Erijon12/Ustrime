const express = require("express");
const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Erijon" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", (req, res) => {});

app.listen(3001);