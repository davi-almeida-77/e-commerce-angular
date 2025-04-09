const express = require('express');
const router = express.Router();
const db = require('../database/db'); 

router.get("/", (req, res) => {

    
    db.query("SELECT * FROM products", (err, results) => {
      if (err) {
        console.log(err)
      }
      res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    const productId = req.params.id; 


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

router.get("/images/:id", (req, res) => {
  const productId = req.params.id;  



  db.query(
      "SELECT pi.product_id, pi.image_url, pi.image_type FROM product_images pi JOIN products p ON pi.product_id = p.id_product WHERE pi.product_id = ?", 
      [productId], 
      (err, results) => {
          if (err) {
              console.log(err);
              res.status(500).json({ error: 'Error In Get Product Images' });
          } else {
              if (results.length > 0) {
                  res.json(results);  
              } else {
                  res.status(404).json({ error: 'No Images Found For Product' });
              }
          }
      }
  );
});


  module.exports = router;
