const express = require("express");
const router = express.Router();

const usersRoute = require("./users");
const productsRoute = require("./products");
const authRoute =  require("./auth")

router.use("/api/auth", authRoute)
router.use("/api/users", usersRoute);  
router.use("/api/products", productsRoute); 

module.exports = router;
