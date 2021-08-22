const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderNumber: {
    type: Number,
    AutoIncrement: true,
  },
  createTime: { type: Date, required: true, default: Date.now },
  deliveryDestination: String,
  userName: String,
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  products: [{ type: Schema.Types.ObjectId, ref: "OrderProduct" }],
  totalePrice: Number,
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
