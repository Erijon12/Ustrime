require("dotenv").config();

const mysql2 = require("mysql2");

const db = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USERNAME,
  database: process.env.MYSQL_DATABASE,
});

module.exports = db;
