const express = require('express');
const router = express.Router();
const db = require('../database/db'); 

router.get("/", (req, res) => {

    
    db.query("SELECT * FROM posts", (err, results) => {
      if (err) {
        console.log(err)
      }
      res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    const postId = req.params.id; 


    db.query("SELECT * FROM posts WHERE id = ?", [postId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error In Get Posts ' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);  
            } else {
                res.status(404).json({ error: 'Post Not Found ' });
            }
        }
    });
});


module.exports = router;
