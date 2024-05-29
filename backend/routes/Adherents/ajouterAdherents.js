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

router.get('/check-adherent', async (req, res) => {
  try {
    const { prenom, nom, datedenaissance } = req.query;
    const sql = `SELECT COUNT(idPersonnes) AS count, Prenom, Nom, Sexe, date_de_naissance, Age, libele_Licence, telPortable, commune, adresseMail, NomSection, numEtVoie, codePostal FROM Vue_sections WHERE Prenom = ? AND Nom = ? AND date_de_naissance = ?`;
    const result = await query(sql, [prenom, nom, datedenaissance]);

    const exists = result[0].count > 0;
    if (exists) {
      const adherentInfo = { lieuNaissanceP: result[0].NomSection };
      res.json({ exists, adherentInfo });
    } else {
      res.json({ exists });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/checkParent', async (req, res) => {
  try {
    const { prenomP: prenom, nomP: nom } = req.query;
    const sql = `SELECT COUNT(idPersonne) AS count, prenom, nom, genre, dateNaissance, lieuNaissance FROM personnes WHERE prenom = ? AND nom = ?`;
    const result = await query(sql, [prenom, nom]);

    const exists = result[0].count > 0;
    if (exists) {
      const parentInfo = {
        prenom: result[0].prenom,
        nom: result[0].nom,
        genre: result[0].genre,
        dateNaissance: result[0].dateNaissance,
        lieuNaissance: result[0].lieuNaissance,
      };
      res.json({ exists, parentInfo });
    } else {
      res.json({ exists });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function isMineur(dateNaissance) {
  const dateNaissanceObj = new Date(dateNaissance);
  const dateNow = new Date();
  let age = dateNow.getFullYear() - dateNaissanceObj.getFullYear();
  let m = dateNow.getMonth() - dateNaissanceObj.getMonth();
  if (m < 0 || (m === 0 && dateNow.getDate() < dateNaissanceObj.getDate())) {
    age--;
  }
  return age < 18;
}

router.post('/ajouterAdherant', upload.single('image'), async (req, res) => {
  try {
    const mineur = isMineur(req.body.dateDeNaissance);
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
      const insertPersonSql = "INSERT INTO personnes (nom, prenom, dateNaissance, nationalite, lieuNaissance, genre, image, idRole) VALUES (?, ?, ?, ?, ?, ?, ?, 2)";
      const resultInsertPerson = await query(insertPersonSql, [nom, prenom, datedenaissance, nationalite, lieudenaissance, genre, pathWithAssetsPrefix]);
      idpersonne = resultInsertPerson.insertId;

      const coordonneesSql = "INSERT INTO coordonnees (idPersonne, adresseMail, telPortable, numEtVoie, codePostal, commune) VALUES (?, ?, ?, ?, ?, ?)";
      await query(coordonneesSql, [idpersonne, adresseMail, telPortable, numEtVoie, codePostal, commune]);

      if (mineur) {
        const parentSql = "INSERT INTO personnes (nom, prenom, dateNaissance, lieuNaissance, idRole) VALUES (?, ?, ?, 'fff', 7)";
        const resultParent1 = await query(parentSql, [nomParent, prenomParent, dateNaissanceP]);
        const idParent1 = resultParent1.insertId;

        const coordonneesParentSql = "INSERT INTO coordonnees (idPersonne, adresseMail, telPortable, numEtVoie, codePostal, commune) VALUES (?, ?, ?, ?, ?, ?)";
        await query(coordonneesParentSql, [idParent1, emailParent, telParent, numVoie, codePostal, commune]);

        const lienParenteSql = "INSERT INTO liensparente (typeLien, parentUnique, idPersonne1, idPersonne2) VALUES (?, ?, ?, ?)";
        await query(lienParenteSql, [sexeParent, idParent1, idpersonne, idParent1]);
      }
    }

    const adhesionSql = "INSERT INTO adhesions (idPersonnes, idSection, idlicence, idSaison, idNotification, commentaire, paiement, statutAdhesion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    await query(adhesionSql, [idpersonne, req.body.idSection, idLicence, idSaison, idNotification, commentaire, paiement, statutAdhesion]);

    const licenceSql = "INSERT INTO licences (idPersonne, libeleLicence) VALUES (?, ?)";
    await query(licenceSql, [idpersonne, idLicence]);

    res.status(200).send("Adhérent, adhésion, licence, coordonnées et liens de parenté enregistrés avec succès.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
