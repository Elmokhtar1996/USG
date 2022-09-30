var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors')
const session = require('express-session');
const passport = require('passport');
require('./route/auth');

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var con = mysql.createConnection({
  host: "usg.bdd01.blocnet.fr",
  user: "usgbdd",
  password: "Usg2021!",
  database: "usgbdd"
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

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/signup', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {

  res.redirect('http://localhost:4200/home');

});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});
app.get('/read/:id' , (req, res) => {
 
    con.query('SELECT * FROM Vue_sections" ', function (err, data)  {
      if (err) throw err;
      return res.json(data);

  });
})
// set port
app.listen(4000, function () {
  console.log('Node app is running on port 4000');
});
module.exports = app;
