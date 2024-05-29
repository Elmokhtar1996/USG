const express = require('express');
const router = express.Router();
const con = require('../../db');
//////////////////////
router.post('/archive',(req, res, next) => {
  console.log("Requête POST reçue avec les données suivantes:", req.body);
  let statutAdhesion = req.body.statutAdhesion;
  let idSaison = req.body.idSaison;
  let nom = req.body.Nom;
  let prenom = req.body.Prenom;
  let datedenaissance = req.body.date_de_naissance;
  let genre = req.body.Sexe;
  let NomSection = req.body.NomSection;
  let telPortable = req.body.telPortable;
  let adresseMail = req.body.adresseMail;
  let commune = req.body.commune;
  let numEtVoie = req.body.numEtVoie;
  let idPersonne = req.body.ID;
  var sql = "INSERT INTO archives (idPersonne,statutAdhesion,idSaison,nom,prenom,dateNaissance,genre,NomSection,telPortable,adresseMail,commune,numEtVoie,idRole) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,5)";
  con.query(sql,[idPersonne,statutAdhesion,idSaison,nom,prenom,datedenaissance,genre,NomSection,telPortable,adresseMail,commune,numEtVoie], function (err, result) {
    if (err) {
      console.error("Erreur lors de l'insertion dans la base de données :", err);
      return res.status(500).json({ error: "Une erreur est survenue lors de l'insertion." });
    }
    console.log("Adhérent archivé ");
    console.log(req.body.idP)
    res.status(200).json({ message: "Adhérent archivé avec succès." });
  });
}
) 


// suprimmerBeniveole
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  con.query(`DELETE FROM personnes WHERE idPersonne = ${id}`, function (err, result) {
    if (err) throw err;
    console.log(`Bénévole avec l'identifiant ${id} supprimé`);
    res.status(200).json({
      message: "Bénévole supprimé avec succès"
    });
  });
});

module.exports = router;
