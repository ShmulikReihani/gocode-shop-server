const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");

route.post("/registration", userController.registration);
route.post("/authentication", userController.authentication);

module.exports = route;
