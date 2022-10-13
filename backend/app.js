var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var con = mysql.createConnection({
  host: "usg.bdd01.blocnet.fr",
  user: "usgbdd",
  password: "Usg2021!",
  database: "usgbdd",
});

// connect to database
con.connect(); 
// Retrieve all  
app.get('/section', function (req, res) {
  con.query('SELECT * FROM sections ', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});
app.get('/adherant', function (req, res) {
  con.query('SELECT * FROM Vue_sections ', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});

app.get('/nbadherant', function (req, res) {
  con.query('SELECT COUNT(idAdhesion) AS "nba" FROM  adhesions ', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});

app.get('/nbsection', function (req, res) {
  con.query('SELECT COUNT(idSection ) AS "nbs" FROM  sections ', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});



app.get('/read/:id' , (req, res) => {
 
    con.query('SELECT * FROM Vue_sections" ', function (err, data)  {
      if (err) throw err;
      return res.json(data);

  });
})


// Sign-up
app.post('/create',(req, res, next) => {
    console.log("yess")
      let email = req.body.email;
      let password = req.body.password;
    con.query('INSERT INTO acces VALUES idRole = ? AND nomUser = ? AND passUser = ? AND statutAcces = ? AND 	derniereConnexion = ? ', [2,email, password,'active','07/10/2022'], function(error, results, fields) 
    {
     
    })}    
);

// AdherantsHF
app.get('/AdherantsAge' , (req, res) => {
 
  con.query('SELECT * FROM adherents_grinois', function (err, data)  {
    if (err) throw err;
    return res.json(data);

});
})

// set port
app.listen(4000, function () {
  console.log('Node app is running on port 4000');
});
module.exports = app;
