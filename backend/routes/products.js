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

  router.get("/:id", (req, res) => {
    const productId = req.params.id; 

    console.log(`Request to obtain product with ID: ${productId}`);

    db.query("SELECT * FROM products WHERE id_product = ?", [productId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error In Get Product ' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);  
            } else {
                res.status(404).json({ error: 'Product Not Found ' });
            }
        }
    });
});

  module.exports = router;
