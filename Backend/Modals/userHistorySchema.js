const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userHistorySchema = new Schema(
  {
   userId:{type: mongoose.Types.ObjectId, ref: "users" },
   doctorId:{type:String , required:true},
   feesPaid:{type:Number}
  },
  { timestamps: true }
);

const userHistory = mongoose.model("userHistorys", userHistorySchema);

module.exports = userHistory;
