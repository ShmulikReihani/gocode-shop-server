const express = require("express");
const route = express.Router();
const ordersController = require("../controllers/orders");

route.get("/", ordersController.getAllOrders);
route.get("/:id", ordersController.getSingleOrder);
route.post("/", ordersController.createNewOrder);
route.delete("/:id", ordersController.deleteOrder);

module.exports = route;
