const { getPasswordHash } = require("../global");
const db = require("../database/database");
const bcrypt = require("bcryptjs");

module.exports = {
  user_login: async (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    let pass = req.body.Pass;
    try {
      let sql = "SELECT * FROM user WHERE phoneNumber = ?";

      db.query(sql, [phoneNumber], async (err, params) => {
        if (err) {
          throw err;
        }
        let userPassword = params[0].password;
        let user_PhoneNumber = params[0].phoneNumber;
        const password = await bcrypt.compare(pass, userPassword);

        if (phoneNumber == "" || pass == "") {
          return res.json({
            status: false,
            error: "Please Enter Phone Number and password",
          });
        }

        if (user_PhoneNumber == phoneNumber && password) {
          res.render("profile.ejs", {
            data: params[0],
            logged: true,
          });
        } else {
          return res.json({
            status: false,
            error: "Incorrect Phone Number or Password",
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: false,
        error: "User failed to Login",
      });
    }
  },
  create_account: async (req, res) => {
    let phoneNumber = req.body.phoneNumber;
    let name = req.body.name;
    let surname = req.body.surname;
    let pass = req.body.Pass;
    try {
      let sql = "SELECT phoneNumber FROM user WHERE phoneNumber = ?";

      const password = await getPasswordHash({ password: pass });

      db.query(sql, [phoneNumber], (err, params) => {
        if (err) {
          throw err;
        }
        console.log(params, "params");
        if (params[0]) {
          return res.json({
            status: false,
            error: "User is already been registered",
          });
        } else {
          let sql = `INSERT INTO user (Name, Surname, phoneNumber, password) VALUES (?, ?, ?, ?);`;
          db.query(
            sql,
            [name, surname, phoneNumber, password],
            (err, result) => {
              if (err) throw err;
              return res.json({
                status: true,
                error: "User has been registered",
              });
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: false,
        error: "User failed to register",
      });
    }
  },
};
