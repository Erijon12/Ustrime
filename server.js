require("dotenv").config();

const express = require("express");
const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("profile.ejs", {
    logged: false,
  });
});

require("./app_routes/routes_user")(app);

app.listen(3001);
