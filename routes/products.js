const express = require("express");
const route = express.Router();
const productsController = require("../controllers/products");

route.get("/", productsController.getAllProducts);
route.get("/:id", productsController.getSingleProduct);
route.delete("/:id", productsController.deleteProduct);

module.exports = route;
