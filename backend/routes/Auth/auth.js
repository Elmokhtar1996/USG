const express = require('express');
const router = express.Router();
const con = require('../../db');

// Endpoint pour récupérer les rôles d'un utilisateur par son email
// Endpoint pour récupérer les rôles d'un utilisateur par son email
router.get('/getRolesByEmail/:email', (req, res, next) => {
    const email = req.params.email;
    const sql = `
      SELECT a.idRole, a.nomUser, a.statutAcces, r.libelleRole
      FROM acces AS a
      LEFT JOIN roles AS r ON a.idRole = r.idRole
      WHERE a.nomUser = ?`;
    
    con.query(sql, [email], function (err, result) {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des rôles' });
      } else {
        res.json(result);
        console.log("Rôles de l'utilisateur:", result);
      }
    });
});

  module.exports = router;
