// db.js
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "usg.bdd01.blocnet.fr",
  user: "usgbdd",
  password: "Usg2021!",
  database: "usgbdd",
});

// Connect to the database


module.exports = con;
