const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userHistorySchema = new Schema(
  {
   doctorId:{type:String , required:true},
   feesPaid:{type:String}
  },
  { timestamps: true }
);

const userHistory = mongoose.model("userHistorys", userHistorySchema);

module.exports = userHistory;
