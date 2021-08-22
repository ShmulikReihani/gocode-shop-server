const product = require("../models/product");
const User = require("../models/User");
const fs = require("fs");

module.exports = (app) => {
  app.get("/api/setup", (req, res) => {
    fs.readFile("products.json", function (err, data) {
      if (err) throw err;
      const products = JSON.parse(data);
      product.create(products, (err, results) => {
        if (err) throw err;
        res.json(results);
      });
    });

    const user = {
      username: "shmulik",
      email: "admin@gmail.com",
      password: "123456",
      admin: true,
    };
    User.create(user, (err, results) => {
      if (err) throw err;
      //   res.json(results);
    });
  });
};
