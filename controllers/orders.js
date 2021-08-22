const Order = require("../models/order");
const OrderProduct = require("../models/orderProduct");

exports.getAllOrders = (req, res, next) => {
  Order.find({}, (err, products) => {
    if (err) throw Error(err);
    return res.status(200).json(products);
  })
    .populate({
      path: "products",
      model: "OrderProduct",
      populate: {
        path: "productId",
        model: "Product",
      },
    })
    .populate("userId");
};

exports.getSingleOrder = (req, res, next) => {};

exports.deleteOrder = (req, res, next) => {};

exports.createNewOrder = (req, res, next) => {
  const { products, deliveryDestination, firstName, totalePrice, userId } =
    req.body;
  const order = Order({
    deliveryDestination: deliveryDestination,
    userName: firstName,
    totalePrice: totalePrice,
    userId: userId,
  });

  order.save((err) => {
    if (err) throw Error(err);
  });
  for (const product of products) {
    const p = OrderProduct({
      orderId: order._id,
      productId: product.products.id,
      quantity: product.quantity,
      price: product.price,
    });
    p.save((err) => {
      if (err) throw Error(err);
    });

    order["products"].push(p._id);
  }
};
