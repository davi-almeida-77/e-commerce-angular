const express = require('express');
const router = express.Router();
const db = require('../database/db'); 

router.get("/", (req, res) => {
    console.log(" Requisition For Products ");
    
    db.query("SELECT * FROM products", (err, results) => {
      if (err) {
        console.log(err)
      }
      res.json(results);
    });
  });

  module.exports = router;

