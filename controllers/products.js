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

exports.getAllBySearch = (req, res, next) => {
  const { title, category, description, maxPrice, minPrice } = req.query;
  let query = {};
  if (title) {
    query["title"] = { $regex: title, $options: "i" };
  }
  if (category) {
    query["category"] = { $regex: category, $options: "i" };
  }
  if (description) {
    query["description"] = { $regex: category, $options: "i" };
  }
  if (maxPrice && minPrice) {
    query["price"] = { $lte: maxPrice, $gte: minPrice };
  }
  Product.find(query, (err, products) => {
    if (err) res.status(400).json(err);
    return res.status(200).send(products);
  });
};

exports.createNewProduct = (req, res, next) => {
  const { title, category, description, price, image } = req.body;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    category: category,
    image: image,
  });

  product.save((err) => {
    if (err) res.status(400).json(err);
    return res.status(200).send("OK");
  });
};

exports.updateSingleProduct = async (req, res, next) => {
  const { id } = req.params.id;
  const { title, price, description, category, image } = req.body;

  try {
    var updatedProduct = await Product.findByIdAndUpdate(id, {
      title,
      price,
      description,
      category,
      image,
    });
    return res.status(200).json({
      status: 200,
      data: updatedProduct,
      message: "Succesfully update post",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
