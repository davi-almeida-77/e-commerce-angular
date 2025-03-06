const express = require("express");
const router = express.Router();

const usersRoute = require("./users");
const productsRoute = require("./products");
const authRoute =  require("./auth")
const ordersRoute =  require("./orders")

router.use("/api/auth", authRoute)
router.use("/api/users", usersRoute);  
router.use("/api/products", productsRoute); 
router.use("/api/orders", ordersRoute);

module.exports = router;
