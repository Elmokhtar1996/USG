app.get('/adherant', function (req, res) {
  con.query('SELECT * FROM Vue_sections ', function (err, data)  {
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
module.exports = adherant;