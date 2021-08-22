const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderProductSchema = new Schema({
  orderId: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  quantity: Number,
  price: Number,
});

const OrderProduct = mongoose.model("OrderProduct", OrderProductSchema);

module.exports = OrderProduct;
