const express = require('express');
const router = express.Router();
const con = require('../../db');

router.post('/ajouterEvenement', (req, res, next) => {
console.log("eeeee")

  let title = req.body.title;
  let date = req.body.date;
  let time = req.body.time;


  var sql = "INSERT INTO Evenement (title,date,time) VALUES (? ,?)";
  con.query(sql,[title,date,time], function (err, result) {
    if (err) throw err;
    console.log("Event ajouter");
  });

});
router.delete('/events/:id', (req, res) => {
    const eventId = req.params.id;
  
    con.query('DELETE FROM Evenement WHERE id = ?', [eventId], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression de l\'événement depuis la base de données:', err);
        res.status(500).send('Erreur lors de la suppression de l\'événement depuis la base de données');
      } else {
        res.send('Événement supprimé avec succès');
      }
    });
  });
  
router.get('/events', (req, res) => {
    con.query('SELECT * FROM Evenement', (err, data) => {
      if (err) {
        console.error('Erreur lors de la récupération des événements depuis la base de données:', err);
        res.status(500).send('Erreur lors de la récupération des événements depuis la base de données');
      } else {
        res.json(data);
      }
    });
  });

  router.get('/statutAdhesion', (req, res) => {
    con.query(`
        SELECT statutAdhesion, COUNT(*) AS nombre
        FROM Vue_sections
        GROUP BY statutAdhesion;
    `, (err, data) => {
        if (err) {
            console.error('Erreur lors de la récupération des données depuis la base de données :', err);
            res.status(500).send('Erreur lors de la récupération des données depuis la base de données');
        } else {
            res.json(data);
        }
    });
});



  router.get('/nombresSaison', (req, res) => {
    const query = `
        SELECT 
            CASE 
                WHEN idSaison = 1 THEN '2021-09-01 - 2022-08-31'
                WHEN idSaison = 2 THEN '2022-09-01 - 2023-08-31'
                WHEN idSaison = 3 THEN '2020-09-01 - 2021-08-31'
                WHEN idSaison = 4 THEN '2019-09-01 - 2020-08-31'
                ELSE 'Inconnue'
            END AS saison,
            COUNT(*) AS nombre_adherents
        FROM Vue_sections
        GROUP BY idSaison;
    `;

    con.query(query, (err, data) => {
        if (err) {
            console.error('Erreur lors de la récupération des événements depuis la base de données:', err);
            res.status(500).send('Erreur lors de la récupération des événements depuis la base de données');
        } else {
            res.json(data);
        }
    });
});

 
  
    
router.get('/nombresSections', (req, res) => {
  con.query(' SELECT NomSection, COUNT(*) AS nombre_adherents FROM Vue_sections GROUP BY NomSection', (err, data) => {
    if (err) {
      console.error('Erreur lors de la récupération des événements depuis la base de données:', err);
      res.status(500).send('Erreur lors de la récupération des événements depuis la base de données');
    } else {
      res.json(data);
    }
  });
});
 

  
  


module.exports = router;
