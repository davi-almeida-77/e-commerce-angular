const express = require("express");
const router = express.Router();

const usersRoute = require("./users");
const productsRoute = require("./products");
const authRoute =  require("./auth");
const ordersRoute =  require("./orders");
const blogRoute = require("./blog");

router.use("/api/auth", authRoute)
router.use("/api/users", usersRoute);  
router.use("/api/products", productsRoute); 
router.use("/api/orders", ordersRoute);
router.use("/api/blog/posts", blogRoute)

module.exports = router;
