const fs = require("fs");
const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) res.status(400).json(err);
    res.status(200).send(products);
  });
};

exports.getSingleProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById({ _id: id }, (err, products) => {
    if (err) res.status(400).json(err);
    res.status(200).send(products);
  });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndDelete({ _id: id }, (err, products) => {
    if (err) res.status(400).json(err);
    res.status(200).send(products);
  });
};
