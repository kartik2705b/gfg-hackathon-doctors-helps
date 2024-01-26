const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppoinmentSchema = new Schema(
  {
   doctorId:{type: mongoose.Types.ObjectId, ref: "doctors" },
   userId:{type:mongoose.Types.ObjectId , ref:"users"},
   date:{type:Date , default:new Date()},
   time:{type:String },
   fees:{type:Number , required:true},
   status:{type:String , enum:["confirmed" , "cancelled" , "pending"] ,default:"pending" },
   confirmed:{type:Boolean , default:false}
  },
  { timestamps: true }
);

const Appoinment = mongoose.model("Appointments", AppoinmentSchema);

module.exports = Appoinment;
