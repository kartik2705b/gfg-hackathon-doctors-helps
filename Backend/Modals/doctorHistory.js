const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorHistorySchema = new Schema(
  {
    doctorId:{type: mongoose.Types.ObjectId, ref: "doctors" },
   patientId:{type:String , required:true},
   feesGot:{type:Number}
  },
  { timestamps: true }
);

const doctorHistory = mongoose.model("doctorHistorys", doctorHistorySchema);

module.exports = doctorHistory;
