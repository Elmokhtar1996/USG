const express = require('express');
const router = express.Router();
const con = require('../../db');

router.post('/envoyeremail', (req, res, next) => {


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




module.exports = router;
