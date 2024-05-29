// connect to database
const express = require('express');
const router = express.Router();
const con = require('../../db');
const path = require('path');
const multer = require('multer'); // Importez multer avant de l'utiliser

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../..', 'USG/src/assets/sectionImages')); // Destination : dossier 'assets' dans votre application Angular
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nom du fichier téléchargé
  }
});

// Configurer Multer avec les options de stockage
const upload = multer({ storage: storage });

// Configurer Multer avec les options de stockage

  
router.get('/sections', function (req, res) {
  con.query('SELECT * FROM sections ', function (err, data) {
    if (err) throw err;
    return res.json(data);
  });
});
// routes/sections.js

router.delete('/sections/:id', function (req, res) {
  const sectionId = req.params.id;

  const sql = "DELETE FROM sections WHERE idSection = ?";
  con.query(sql, [sectionId], function (err, result) {
    if (err) {
      console.error("Erreur lors de la suppression de la section :", err);
      return res.status(500).json({ message: "Erreur lors de la suppression de la section" });
    }
    console.log("Section supprimée avec succès");
    return res.status(200).json({ message: "Section supprimée avec succès" });
  });
});

router.post('/ajouterSection', upload.single('image'), (req, res, next) => {
  // Ici, 'image' est le nom du champ de votre formulaire qui contient l'image
  let libelleSection = req.body.libelleSection;
  let image = req.file.filename; // Utilisez req.file pour obtenir les informations sur le fichier téléchargé

  var sql = "INSERT INTO sections (Libelle, image) VALUES (?, ?)";
  con.query(sql, [libelleSection, image], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de l'ajout de la section" });
    } else {
      console.log("Section ajoutée avec succès");
      res.status(200).json({ message: "Section ajoutée avec succès" });
    }
  });
});




module.exports = router;