const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorHistorySchema = new Schema(
  {
   patientId:{type:String , required:true},
   feesGot:{type:String}
  },
  { timestamps: true }
);

const doctorHistory = mongoose.model("doctorHistorys", doctorHistorySchema);

module.exports = doctorHistory;
