const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    products: {type:Array},
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Placed", "Cancelled", "Return", "Delivered"],
      default: "Placed",
    },
    shippingAddress: { type: Object, required: true },
    paymentId: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderItem = mongoose.model("OrderItems", OrderSchema);

module.exports = OrderItem;
