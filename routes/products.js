const express = require("express");
const route = express.Router();
const productsController = require("../controllers/products");

route.get("/", productsController.getAllProducts);
route.post("/", productsController.createNewProduct);
route.get("/search", productsController.getAllBySearch);
route.get("/:id", productsController.getSingleProduct);
route.put("/:id", productsController.updateSingleProduct);
route.delete("/:id", productsController.deleteProduct);

module.exports = route;
