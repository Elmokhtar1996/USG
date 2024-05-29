const express = require('express');
const router = express.Router();
const con = require('../../db');
const path = require('path');
const multer = require('multer');
const { promisify } = require('util');
const PORT = process.env.PORT || 3000;

// Promisify the query function
const query = promisify(con.query).bind(con);

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../..', 'USG/src/assets'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
router.get('/afficherEmployee', function (req, res) {
  con.query('SELECT coordonnees.idCoordonnees,coordonnees.adresseMail,coordonnees.telFixe,coordonnees.telPortable,coordonnees.numEtVoie,coordonnees.codePostal,coordonnees.commune,personnes.idPersonne AS ID, personnes.nom AS Nom ,personnes.image AS image ,personnes.prenom AS Prenom,personnes.genre AS Sexe,personnes.datenaissance AS date_de_naissance FROM coordonnees LEFT JOIN personnes ON coordonnees.idPersonne = personnes.idPersonne where personnes.idRole = 5', function (err, data) {
    if (err) throw err;
    return res.json(data);
  });
});
router.post('/ajouterEmployee', upload.single('image'), async (req, res) => {

    const absolutePath = req.file.path;
    const relativePath = path.relative('C:\\Users\\Admin\\Desktop\\nvprojet\\AppUSG\\USG\\src\\assets', absolutePath);
    const pathWithAssetsPrefix = 'assets/' + relativePath.replace(/\\/g, '/');

    const {
      nom, prenom, dateDeNaissance: datedenaissance, nationalite, lieudenaissance, poids, genre, commentaire, paiement,
      statutAdhesion, numsecsociale, idLicence, idSaison, typeDeduction, montant, idDocument, notification: idNotification,
      statutDeduction, adresseMail, telPortable, numEtVoie, codePostal, commune, nomParent, prenomParent, sexeParent,
      emailParent, telParent, numVoie, voieParent, dateNaissanceP
    } = req.body;

    const checkPersonSql = "SELECT idPersonne FROM personnes WHERE nom = ? AND prenom = ? AND dateNaissance = ?";
    const result = await query(checkPersonSql, [nom, prenom, datedenaissance]);

    let idpersonne;
    if (result.length > 0) {
      idpersonne = result[0].idPersonne;
    } else {
      const insertPersonSql = "INSERT INTO personnes (nom, prenom, dateNaissance, nationalite, lieuNaissance, genre, image, idRole) VALUES (?, ?, ?, ?, ?, ?, ?, 5)";
      const resultInsertPerson = await query(insertPersonSql, [nom, prenom, datedenaissance, nationalite, lieudenaissance, genre, pathWithAssetsPrefix]);
      idpersonne = resultInsertPerson.insertId;

      const coordonneesSql = "INSERT INTO coordonnees (idPersonne, adresseMail, telPortable, numEtVoie, codePostal, commune) VALUES (?, ?, ?, ?, ?, ?)";
      await query(coordonneesSql, [idpersonne, adresseMail, telPortable, numEtVoie, codePostal, commune]);

 
    }

  


});


/////////////////


module.exports = router;
