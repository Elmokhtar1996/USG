const afficherAdherents = require('./routes/Adherents/afficherAdherents');
const ajouterAdherents = require('./routes/Adherents/ajouterAdherents');
const communication = require('./routes/Adherents/communication');
const supressionAdherents = require('./routes/Adherents/supressionAdherents');
const Evenement = require('./routes/Calendar/Evenement');
const Sections = require('./routes/Sections/sections');
const Employee = require('./routes/Employee/afficher')
const auth = require('./routes/auth.routes');
const session = require('express-session');
const PORT = process.env.PORT || 4000;

const passport = require('passport');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
const nodemailer = require('nodemailer');
const LocalStrategy = require('passport-local').Strategy;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', Employee)
app.use('/', afficherAdherents);
app.use('/', ajouterAdherents);
app.use('/', communication);
app.use('/', Evenement);
app.use('/', supressionAdherents);
app.use('/', auth);
app.use('/', Sections);

// connect to database
const con = require('./db'); // Chemin relatif vers le module de connexion

con.connect(); 
// Retrieve all  
app.get('/section', function (req, res) {
  con.query('SELECT * FROM sections, lieuxevenement WHERE sections.idSection = lieuxevenement.idSection', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
    
  });
});


app.get('/checkEmail', function (req, res) {
  const email = req.query.email; // Récupérer l'e-mail depuis la requête

  // Effectuez une requête SQL pour vérifier si l'e-mail existe dans la base de données
  con.query('SELECT * FROM acces WHERE nomUser = ?', [email], function (err, user) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la recherche dans la base de données' });
    }

    if (user.length > 0) {
      // L'e-mail correspond à un enregistrement dans la base de données
      console.log('L\'e-mail existe déjà dans la base de données');
      return res.json({ message: 'oui' }); // Envoyer "oui" comme réponse JSON
    } else {
      // Aucun enregistrement correspondant à l'e-mail trouvé
      console.log('Aucun enregistrement correspondant à l\'e-mail trouvé dans la base de données');
      return res.json({ message: 'non' }); // Envoyer "non" comme réponse JSON
    }
  });
});


app.post('/sendmail', (req, res) => {
  // Récupérez l'e-mail de la demande POST
  const userEmail = req.body.email;
console.log("test")
  // Effectuez une requête SQL pour vérifier si l'e-mail existe dans la base de données
  con.query('SELECT * FROM acces WHERE nomUser = ?', [userEmail], (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la recherche dans la base de données' });
    }

    if (user.length > 0) {
      // L'e-mail correspond à un enregistrement dans la base de données
      console.log('L\'e-mail existe déjà dans la base de données');
      return res.json({ message: 'oui' }); // Envoyer "oui" comme réponse JSON
    } else {
      // Aucun enregistrement correspondant à l'e-mail trouvé
      console.log('Aucun enregistrement correspondant à l\'e-mail trouvé dans la base de données');
      return res.json({ message: 'non' }); // Envoyer "non" comme réponse JSON
    }
  });
});

app.get('/sectionAdherants', function (req, res) {
  con.query('SELECT * FROM sections', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
    
  });
});

app.get('/acces', function (req, res) {
  con.query('SELECT * FROM acces ', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});
app.get('/benevole', function (req, res) {
  con.query('SELECT * FROM  personnes  WHERE idRole = 3', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});
app.get('/adherant/:id', function (req, res) {
  const id = req.params.id;
  con.query('SELECT * FROM personnes WHERE idPersonne = ?', [id], function (err, data)  {
    if (err) throw err;
    return res.json(data);    
  });
});

app.get('/adherantvue', function (req, res) {
  con.query('SELECT * FROM Vue_adherents ', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});


app.get('/check-adherent', (req, res) => {
  const prenom = req.query.prenom;
  const nom = req.query.nom;
  const datedenaissance = req.query.datedenaissance;

  const sql = `SELECT COUNT(idPersonne) AS count FROM personnes WHERE prenom = ? AND nom = ? AND dateNaissance = ?`;
  con.query(sql, [prenom, nom, datedenaissance], (err, result) => {
    if (err) throw err;
    const exists = result[0].count > 0;
    res.json(exists);
  });
});
app.get('/checkParent', (req, res) => {
  const prenom = req.query.prenomP;
  const nom = req.query.nomP;
  const sql = `SELECT COUNT(idPersonne) AS count, prenom, nom, genre, dateNaissance, lieuNaissance FROM personnes WHERE prenom = ? AND nom = ?`;
  con.query(sql, [prenom, nom], (err, result) => {
    if (err) throw err;

    const exists = result[0].count > 0;
    if (exists) {
      const parentInfo = {
        prenom: result[0].prenom,
        nom: result[0].nom,
        genre: result[0].genre,
        dateNaissanceP: result[0].dateNaissance,
        lieuNaissanceP: result[0].lieuNaissance,
        // Ajoutez d'autres propriétés si nécessaire
      };

      res.json({ exists, parentInfo });
    } else {
      res.json({ exists });
    }
  });
});



app.get('/employe', function (req, res) {
  con.query('SELECT COUNT(idPersonne ) AS "nbe" FROM  personnes  WHERE idRole = 5 ', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});

app.get('/dirigeant', function (req, res) {
  con.query('SELECT * FROM  personnes  WHERE idRole = 4', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});

app.get('/employelist', function (req, res) {
  con.query('SELECT * FROM  personnes  WHERE idRole = 5', function (err, data)  {
    if (err) throw err;
    return res.json(data);
    
  });
});



app.get('/nbdirigeant', function (req, res) {
  con.query('SELECT COUNT(idPersonne ) AS "nbd" FROM  personnes  WHERE idRole = 4', function (err, data)  {
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
app.post('/ajouterAdherant', (req, res, next) => {    // console.log("yess")
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let datedenaissance = req.body.dateDeNaissance;
    let nationalite = req.body.nationalite;
    let lieudenaissance = req.body.lieudenaissance;
    let poids = req.body.poids;
    let genre = req.body.genre;
    let commentaire = req.body.commentaire;
    let paiement = req.body.paiement;
    let statutAdhesion = req.body.statutAdhesion;
    let numsecsociale = req.body.numsecsociale;
    let idsection = req.body.idSection;
    let idLicence = req.body.idLicence;
    let idsaison = req.body.idSaison;
    let typeDeduction = req.body.typeDeduction;
    let montant = req.body.montant;
    let idDocument = req.body.idDocument;
    let idNotification = req.body.notification;
    let statutDeduction = req.body.statutDeduction;
    let LibeleLicence = req.body.libeleLicence;
    let adresseMail  = req.body.adresseMail;
    let telPortable  = req.body.telPortable;
    let numEtVoie  = req.body.numEtVoie;
    let codePostal  = req.body.codePostal;
    let commune  = req.body.commune;
    let  nomParent = req.body.nomParent;
    let  prenomParent = req.body.prenomParent;
    let  sexeParent = req.body.sexeParent;
    let  emailParent = req.body.emailParent;
    let  telParent = req.body.telParent;
    let  numVoie = req.body.numVoie;
    let  voieParent = req.body.voieParent;
    let  dateNaissanceP = req.body.dateNaissanceP;
    
      var sql = "INSERT INTO personnes (nom, prenom, dateNaissance, nationalite, lieuNaissance, genre, poids, idRole) VALUES (?, ?, ?, ?, ?, ?, ?, 2)";
      con.query(sql, [nom, prenom, datedenaissance, nationalite, lieudenaissance, genre, poids], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    
        var idpersonne = result.insertId;
    
        var adhesionSql = "INSERT INTO adhesions (idPersonnes, idSection, idlicence, idSaison,idNotification, commentaire, paiement, statutAdhesion) VALUES (?, ?, ?, ?,?, ?, ?, ?)";
        con.query(adhesionSql, [idpersonne, idsection, idLicence, idsaison,idNotification, commentaire, paiement, statutAdhesion], function (err, resultt) {
          if (err) throw err;
          console.log("1 adhesion record inserted");
    
          var idadhesion = resultt.insertId;
          console.log(idadhesion);
    
          var licenceSql = "INSERT INTO licences (idPersonne, LibeleLicence) VALUES (?, ?)";
          con.query(licenceSql, [idpersonne, LibeleLicence], function (err, result) {
            if (err) throw err;
            console.log("1 licence record inserted");
    
            
            var licenceSql = "INSERT INTO coordonnees (idPersonne, adresseMail, telPortable, numEtVoie, codePostal, commune) VALUES (?, ?, ?, ?, ?, ?)";
            con.query(licenceSql, [idpersonne, adresseMail, telPortable, numEtVoie, codePostal, commune], function (err, result) {
              if (err) throw err;
              console.log("1 coordonnees record inserted");
    
             
                // Insérer parent 1
                var parentSql = "INSERT INTO personnes (nom, prenom,dateNaissance,lieuNaissance,idRole) VALUES (?, ?,?, 'fff', 7)";
                con.query(parentSql, [nomParent, prenomParent,dateNaissanceP,voieParent], function (err, resultParent1) {
                  if (err) throw err;
                  console.log("Parent 1 inséré avec succès");
    
                  var idParent1 = resultParent1.insertId;
    
              
    
                    // Insérer liens de parenté
                    var lienParenteSql = "INSERT INTO liensparente (typeLien, parentUnique, idPersonne1, idPersonne2) VALUES (?, ?, ?, ?)";
                    con.query(lienParenteSql, [sexeParent, idParent1, idpersonne, idParent1], function (err, resultLien1) {
                      if (err) throw err;
                      console.log("Lien de parenté 1 inséré avec succès");
    
                  });
                });
              
            });
          });
        });
      });
    });
app.post('/ajouterBenevole',(req, res, next) => {
  // console.log("yess")
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let datedenaissance = req.body.datedenaissance;
  let nationalite = req.body.nationalite;
  let lieudenaissance = req.body.lieudenaissance;
  let poids = req.body.poids;
  let genre = req.body.genre;
  let numsecsociale = req.body.numsecsociale;
  var sql = "INSERT INTO personnes (nom,prenom,dateNaissance,nationalite,lieuNaissance,genre,poids,numSecuSociale,idRole) VALUES (? ,? ,?,? ,? ,?,? ,?,3)";
  con.query(sql,[nom,prenom,datedenaissance,nationalite,lieudenaissance,genre,poids,numsecsociale], function (err, result) {
    if (err) throw err;
    console.log("benevol ajouter");
  });
}
) 
app.post('/ajouterDirigeant',(req, res, next) => {
  // console.log("yess")
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let datedenaissance = req.body.datedenaissance;
  let nationalite = req.body.nationalite;
  let lieudenaissance = req.body.lieudenaissance;
  let poids = req.body.poids;
  let genre = req.body.genre;
  let numsecsociale = req.body.numsecsociale;
  var sql = "INSERT INTO personnes (nom,prenom,dateNaissance,nationalite,lieuNaissance,genre,poids,numSecuSociale,idRole) VALUES (? ,? ,?,? ,? ,?,? ,?,4)";
  con.query(sql,[nom,prenom,datedenaissance,nationalite,lieudenaissance,genre,poids,numsecsociale], function (err, result) {
    if (err) throw err;
    console.log("benDirigeant ajouter");
  });
}
) 
//////////////////////
app.post('/archive',(req, res, next) => {
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
  var sql = "INSERT INTO archives (statutAdhesion,idSaison,nom,prenom,dateNaissance,genre,NomSection,telPortable,adresseMail,commune,numEtVoie,idRole) VALUES (?,?,?,?,?,?,?,?,?,?,?,5)";
  con.query(sql,[statutAdhesion,idSaison,nom,prenom,datedenaissance,genre,NomSection,telPortable,adresseMail,commune,numEtVoie], function (err, result) {
    if (err) {
      console.error("Erreur lors de l'insertion dans la base de données :", err);
      return res.status(500).json({ error: "Une erreur est survenue lors de l'insertion." });
    }
    console.log("Adhérent archivé ");
    res.status(200).json({ message: "Adhérent archivé avec succès." });
  });
}
) 


// login
// AdherantsHF
app.get('/AdherantsAge' , (req, res) => {
 
  con.query('SELECT * FROM adherents_grinois', function (err, data)  {
    if (err) throw err;
    return res.json(data);

});
})



app.post('/envoyeremail', (req, res, next) => {


  let IDAdherent = req.body.IDAdherent;
  let IDdestinataire = req.body.IDdestinataire;
  let DateHeure = req.body.DateHeure;
  let IDagent = req.body.IDagent;
  let Type = req.body.Type;
  let Sujet = req.body.Sujet;
  let Message = req.body.Message;
  let Statut = req.body.Statut;
  let IDCC1= req.body.IDCC1;
  let IDCC2= req.body.IDCC2;
  let canal = req.body.canal;
  let DateHeureEnvoi= req.body.DateHeureEnvoi;
  let idtemplate = req.body.idtemplate;
  var sql = "INSERT INTO Email (IDAdherent,IDdestinataire,DateHeure,IDagent,Type,Sujet,Message,Statut,IDCC1,IDCC2,canal,DateHeureEnvoi,idtemlate) VALUES (? ,? ,?,? ,? ,?,? ,?,?,?,?,?,?)";
  con.query(sql,[IDAdherent,IDdestinataire,DateHeure,IDagent,Type,Sujet,Message,Statut,IDCC1,IDCC2,canal,DateHeureEnvoi,idtemplate], function (err, result) {
    if (err) throw err;
    console.log("Employee ajouter");
  });

});











// AdherantsHF
app.get('/testuser' , (req, res) => {
 
  con.query('SELECT * FROM acces', function (err, data)  {
    if (err) throw err;
    return res.json(data);

});
})


//acces
app.get('/acces' , (req, res) => {
 
  con.query('SELECT * FROM acces', function (err, data)  {
    if (err) throw err;
    return res.json(data);

});
})
// suprimmerBeniveole
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  con.query(`DELETE FROM personnes WHERE idPersonne = ${id}`, function (err, result) {
    if (err) throw err;
    console.log(`Bénévole avec l'identifiant ${id} supprimé`);
    res.status(200).json({
      message: "Bénévole supprimé avec succès"
    });
  });
});

// roleuser
app.get('/roles' , (req, res) => {
 
  con.query('SELECT * FROM roles', function (err, data)  {
    if (err) throw err;
    return res.json(data);

});
})
// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware pour gérer les erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Capture des exceptions non gérées
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  // Vous pouvez décider de redémarrer votre serveur ou de l'arrêter complètement
  // process.exit(1); // Dans un environnement de production, vous pourriez vouloir arrêter l'application pour éviter des états incohérents
});

// Capture des rejets de promesses non gérés
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Vous pouvez décider de redémarrer votre serveur ou de l'arrêter complètement
  // process.exit(1); // Dans un environnement de production, vous pourriez vouloir arrêter l'application pour éviter des états incohérents
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
