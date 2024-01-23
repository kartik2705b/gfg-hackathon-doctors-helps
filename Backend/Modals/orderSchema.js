const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
productId:{type:String , required:true},
quantity:{type:Number, required:true}
});

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    products: [productSchema],
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
