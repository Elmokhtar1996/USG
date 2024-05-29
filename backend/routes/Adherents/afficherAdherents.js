// connect to database
const express = require('express');
const router = express.Router();
const con = require('../../db');


  
router.get('/licence', function (req, res) {
  con.query('SELECT * FROM licences ', function (err, data) {
    if (err) throw err;
    return res.json(data);
  });
});

router.get('/saison', function (req, res) {
  con.query('SELECT * FROM saisons ', function (err, data) {
    if (err) throw err;
    return res.json(data);
  });
});

router.get('/adherentsgrigny', function (req, res) {
  con.query('SELECT COUNT(*) AS total_adherents, \
                    SUM(CASE WHEN UPPER(Sexe) = "MASCULIN" THEN 1 ELSE 0 END) AS nombre_masculins, \
                    SUM(CASE WHEN UPPER(Sexe) = "FEMININ" THEN 1 ELSE 0 END) AS nombre_feminins \
             FROM Vue_sections', 
             function (err, data) {
    if (err) throw err;
    return res.json(data);
  });
});



router.get('/adherant', function (req, res) {
  con.query('SELECT * FROM Vue_sections ', function (err, data) {
    if (err) throw err;
    return res.json(data);
  });
});
router.get('/adhesionPlus', function (req, res) {
  con.query('SELECT * FROM Vue_sections WHERE idPersonnes IN (SELECT idPersonnes FROM Vue_sections GROUP BY idPersonnes HAVING COUNT(idPersonnes) > 1);', function (err, data) {
    if (err) throw err;
    return res.json(data);
  });
});


router.get('/personnes', function (req, res) {
  con.query('SELECT coordonnees.idCoordonnees,coordonnees.adresseMail,coordonnees.telFixe,coordonnees.telPortable,coordonnees.numEtVoie,coordonnees.codePostal,coordonnees.commune,personnes.idPersonne AS ID, personnes.nom AS Nom ,personnes.prenom AS Prenom,personnes.genre AS Sexe,personnes.datenaissance AS date_de_naissance FROM coordonnees LEFT JOIN personnes ON coordonnees.idPersonne = personnes.idPersonne', function (err, data) {
    if (err) throw err;
    return res.json(data);
  });
});


router.get('/section', function (req, res) {
  con.query('SELECT * FROM sections, lieuxevenement WHERE sections.idSection = lieuxevenement.idSection', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
    
  });
});

router.get('/sectionAdherants', function (req, res) {
  con.query('SELECT * FROM sections', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
    
  });
});

router.get('/adherant/:id', function (req, res) {
  const id = req.params.id;
  con.query('SELECT * FROM Vue_sections WHERE ID = ?', [id], function (err, data)  {
    if (err) throw err;
    return res.json(data);    
  });
});
router.get('/parent/:id', function (req, res) {
  const id = req.params.id;
  con.query('SELECT * FROM coordonnees LEFT JOIN personnes ON coordonnees.idPersonne = personnes.idPersonne WHERE coordonnees.idPersonne = ?', [id], function (err, data)  {
    if (err) throw err;
    return res.json(data);    
  });
});




router.get('/read/:id' , (req, res) => {
 
    con.query('SELECT * FROM Vue_sections" ', function (err, data)  {
      if (err) throw err;
      return res.json(data);

  });
})

router.get('/nbadherant', function (req, res) {
  con.query('SELECT COUNT(idPersonne) AS "nba" FROM  personnes WHERE idRole = 2 ', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  con.query(`DELETE FROM personnes WHERE idPersonne = ${id}`, function (err, result) {
    if (err) throw err;
    console.log(`Bénévole avec l'identifiant ${id} supprimé`);
    res.status(200).json({
      message: "Bénévole supprimé avec succès"
    });
  });
});

router.get('/modifierAdhesion/:id', function(req, res) {
  const id = req.params.id;
  console.log(id);

  con.query(`
    SELECT adhesions.*, sections.nomSection
    FROM adhesions
    JOIN sections ON adhesions.idSection = sections.idSection
    WHERE adhesions.idPersonnes = ${id}
  `, function (err, data) {
    if (err) throw err;
    return res.json(data);    
  });
});

router.get('/getInfosAdhesionById/:id', function(req2, res) {
  const id = req2.params.id;
  console.log('req',id);

  con.query(`SELECT adhesions.*, sections.nomSection, licences.libeleLicence
  FROM adhesions
  LEFT JOIN licences ON adhesions.idLicence = licences.idLicence
  LEFT JOIN sections ON adhesions.idSection = sections.idSection
  WHERE adhesions.idAdhesion = ${id};
  
  `, function (err, data) {
    if (err) throw err;
    return res.json(data);    
  });
});





// Update employee
////////
router.put('/update/:id', (req, res, next) => {
  const {
    nom,
    prenom,
    dateDN,
    nationalite,
    lieudenaissance,
    genre,
    poids,
    numsecsociale,
    idSection,
    idLicence,
    idsaison,
    typeDeduction,
    montant,
    idDocument,
    idNotification,
    statutDeduction,
    LibeleLicence,
    adresseMail,
    telPortable,
    numEtVoie,
    codePostal,
    commune,
    nomParent,
    prenomParent,
    sexeParent,
    emailParent,
    telParent,
    numVoie,
    voieParent,
    paiement,
    statutAdhesion,
    commentaire,
    dateNaissanceP,
  } = req.body;
  const { id } = req.params;
  console.log(id);

  // Effectuer la mise à jour dans la table "personnes"
  const updatePersonnesSql = "UPDATE personnes SET nom=?, prenom=?, dateNaissance=?, nationalite=?, lieuNaissance=?, genre=? WHERE idPersonne = ?";
  con.query(
    updatePersonnesSql,
    [
      nom,
      prenom,
      dateDN,
      nationalite,
      lieudenaissance,
      genre,
      id,
    ],
    (error, result) => {
      if (error) {
        console.error("Erreur lors de la mise à jour de la date de naissance :", error);
        return next(error);
      } else {
        
        // Effectuer la mise à jour dans la table "adhesions"
        const updateAdhesionsSql =
          "UPDATE adhesions SET  idSaison=?, idNotification=?, commentaire=?, paiement=?, statutAdhesion=? WHERE idPersonnes = ?";
        con.query(
          updateAdhesionsSql,
          [
        
            idsaison,
            idNotification,
            commentaire,
            paiement,
            statutAdhesion,
            id,
          ],
          (error, result) => {
            if (error) {
              return next(error);
            } else {

              // Effectuer la mise à jour dans la table "licences"
              const updateLicencesSql =
                "UPDATE licences SET libeleLicence=? WHERE idPersonne = ?";
              con.query(
                updateLicencesSql,
                [LibeleLicence, id],
                (error, result) => {
                  if (error) {
                    return next(error);
                  } else {
                    // Effectuer la mise à jour dans la table "coordonnees"
                    const updateCoordonneesSql =
                      "UPDATE coordonnees SET adresseMail=?, telPortable=?, numEtVoie=?, codePostal=?, commune=? WHERE idPersonne = ?";
                    con.query(
                      updateCoordonneesSql,
                      [
                        adresseMail,
                        telPortable,
                        numEtVoie,
                        codePostal,
                        commune,
                        id,
                      ],
          
                            (error, result) => {
                              if (error) {
                                return next(error);
                              } else {
                                // Effectuer d'autres mises à jour ici si nécessaire
                                res.json(result);
                              }
                            }
                          );
                        }
                      }
                    );

                  }
                  
                }
              );
            }
          }
        );
      }
  );
  router.put('/updateParent/:idPersonneParent', (req, res, next) => {
    const {
      nomParent,
      prenomParent,
      dateNaissanceP,
      sexeParent,
      emailParent,
      telParent,
      numVoieParent,
      voieParent,
      
    } = req.body;
    const { idPersonneParent } = req.params;
    console.log(idPersonneParent)
  
    // Effectuer la mise à jour dans la table "coordonnees"
    const updateCoordonneesParentSql =
    "UPDATE personnes SET nom=?, prenom=?, dateNaissance=?, genre=? WHERE idPersonne = ?";
    con.query(
      updateCoordonneesParentSql,
      [nomParent, prenomParent, dateNaissanceP, sexeParent, idPersonneParent],
      (error, result) => {
        if (error) {
          return next(error);
        } else {
          // Mise à jour des informations du parent dans la table "personnes"
          const updateParentSql =
            "UPDATE coordonnees SET adresseMail=?, telPortable=?, numEtVoie=? WHERE idPersonne = ?";

          con.query(
            updateParentSql,
            [emailParent, telParent, numVoieParent, idPersonneParent],

            (error, result) => {
              if (error) {
                return next(error);
              }
  
              res.json(result);
            }
          );
        }
      }
    );
  });
  

/////////////////


module.exports = router;
