const { create_account, user_login } = require("../routes/user");

module.exports = function (
  app,
  ea, // ensureAuthenticated
  sua, // activityLog
  logOutFromAdmin,
  validator
) {
  //get
  app.get("/login", (req, res) => {
    res.render("login.ejs");
  });
  app.get("/register", (req, res) => {
    res.render("register.ejs");
  });

  //post
  app.post("/login", user_login);
  app.post("/register", create_account);
};
