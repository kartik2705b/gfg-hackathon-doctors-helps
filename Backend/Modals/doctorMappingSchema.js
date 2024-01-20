const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorMapper = new Schema(
  {
   doctorId:{type:String , required:true},
   roomId:{type:String , required:true}
  },
  { timestamps: true }
);

const doctorMapping = mongoose.model("doctorMappings", DoctorMapper);

module.exports = doctorMapping;
