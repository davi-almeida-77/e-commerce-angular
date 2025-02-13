const express = require('express');
const router = express.Router();
const db = require('../database/db'); 


router.get("/", (req, res) => {
    db.query("SELECT * FROM user", (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    });
  });


  module.exports = router;
