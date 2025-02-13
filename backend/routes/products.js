const express = require('express');
const router = express.Router();
const db = require('../database/db'); 

router.get("/", (req, res) => {
    console.log("Requisição para obter produtos");
    
    db.query("SELECT * FROM product", (err, results) => {
      if (err) {
        console.log(err)
      }
      res.json(results);
    });
  });

  module.exports = router;

