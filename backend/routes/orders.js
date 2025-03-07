const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const db = require('../database/db'); 


router.post("/create", orderController.create_order);

router.get("/:userId", (req, res) => {
    const userId = req.params.userId; 
  
    console.log(`Requisition For User Order with ID:  ${userId}`);
  
    const query = `
      SELECT 
        u.username, 
        u.f_name, 
        u.l_name, 
        u.email, 
        o.id_order, 
        o.order_number, 
        o.created_at AS order_created_at, 
        p.p_name AS product_name, 
        op.quantity AS product_quantity, 
        p.price AS product_price, 
        (op.quantity * p.price) AS total_product_value
      FROM 
        users u
      JOIN 
        order_ecommerce o ON u.id = o.id_user
      JOIN 
        order_product op ON o.id_order = op.id_order
      JOIN 
        products p ON op.id_product = p.id_product
      WHERE 
        u.id = ?;
    `;
  

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Error in Find Order.' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Order Not Fount for This User .' });
        } else {
          res.json(results); 
        }
      }
    });
  });

module.exports =  router;