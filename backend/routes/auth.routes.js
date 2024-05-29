const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const router = express.Router();
const { validationResult } = require("express-validator");
const cors = require("cors");
const con = require('../db');

// CORS OPTIONS
var whitelist = ["http://localhost:4200", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};

// Sign-up
router.post("/register-user", (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    bcrypt.hash(req.body.password, 20).then((hash) => {
      const insertQuery = `
        INSERT INTO acces (idRole, nomUser, passUser) 
        VALUES (?, ?, ?)
      `;
      const values = [req.body.role, req.body.email ,hash];

      con.query(insertQuery, values, (err, results, fields) => {
        if (err) {
          console.error("Erreur lors de l'insertion : " + err.message);
          res.status(500).json({
            error: err,
          });
          return;
        }

        res.status(201).json({
          message: "User successfully created!",
          result: results,
        });
      });
    });
  } else {
    return res.status(422).jsonp(errors.array());
  }
});

// Sign-in
router.post("/signin", (req, res, next) => {
  console.log("Requête reçue :", req.body);

  const selectQuery = `
    SELECT * FROM acces WHERE nomUser = ?
  `;

  con.query(selectQuery, [req.body.email], (err, results, fields) => {
    if (err) {
      console.error("Erreur lors de la recherche de l'utilisateur : " + err.message);
      res.status(500).json({
        error: err,
      });
      return;
    }

    const user = results[0];

    if (!user) {
      return res.status(401).json({
        message: "Authentication failed - Utilisateur non trouvé",
      });
    }

    // Comparez les mots de passe directement sans utiliser bcrypt
    if (req.body.password !== user.passUser) {
      console.log('Comparaison des mots de passe réussie : false (comparaison directe)');
      console.log('Mot de passe côté serveur :', user.passUser);
      console.log('Mot de passe reçu depuis le frontend :', req.body.password);

      return res.status(401).json({
        message: "Authentication failed - Mot de passe incorrect (comparaison directe)",
      });
    }

    // Le reste du code pour la génération du jeton JWT et la réponse réussie
    let jwtToken = jwt.sign(
      {
        nomUser: user.nomUser,
        userId: user.idAcces,
        role: user.idRole
      },
      "longer-secret-is-better",
      {
        expiresIn: "1h",
      }
    );

    // Log du rôle côté serveur
    console.log('Rôle du token :', user.idRole);

    res.status(200).json({
      token: jwtToken,
      expiresIn: 3600,
      idAcces: user.idAcces,
    });
  });
})


// Get Users
router.route("/", cors(corsOptionsDelegate)).get(async (req, res, next) => {
  const selectAllQuery = `
    SELECT * FROM acces
  `;
  con.query(selectAllQuery, (err, results, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération des utilisateurs : " + err.message);
      res.status(500).json({
        error: err,
      });
      return;
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
});

// Get Single User
router.route("/user-profile/:id").get(async (req, res, next) => {
  const selectByIdQuery = `
    SELECT * FROM acces WHERE idAcces = ?
  `;

  con.query(selectByIdQuery, [req.params.id], (err, results, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'utilisateur : " + err.message);
      res.status(500).json({
        error: err,
      });
      return;
    }

    res.json({
      data: results[0],
      message: "Data successfully retrieved.",
      status: 200,
    });
  });
});

// Update User
router.route("/update-user/:id").put(async (req, res, next) => {
  const updateQuery = `
    UPDATE acces SET nomUser = ?, passUser = ?, statutAcces = ? WHERE idAcces = ?
  `;

  const values = [req.body.name, req.body.passUser, req.body.statutAcces, req.params.id];

  con.query(updateQuery, values, (err, results, fields) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur : " + err.message);
      res.status(500).json({
        error: err,
      });
      return;
    }

    res.json({
      data: results,
      msg: "Data successfully updated.",
    });
  });
});

// Delete User
router.route("/delete-user/:id").delete(async (req, res, next) => {
  const deleteQuery = `
    DELETE FROM acces WHERE idAcces = ?
  `;

  con.query(deleteQuery, [req.params.id], (err, results, fields) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'utilisateur : " + err.message);
      res.status(500).json({
        error: err,
      });
      return;
    }

    res.json({
      msg: "Data successfully deleted.",
    });
  });
});

module.exports = router;
