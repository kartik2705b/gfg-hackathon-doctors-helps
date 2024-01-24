const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  date: { type: Date },
  time: { type: String },
  day: { type: String },
  event: { type: String },
});

const doctorsData = new Schema({
     expirence:{type:Number},
     education:{type:String},
     fees:{type:Number},
     title:{type:String},
     description:{type:String},
     isAvailable:{type:Boolean , default:false},
})


const DoctorSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: { type: String, required: true },
    password: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ["doctor", "patient"], default: "patient" },
    schedule: [ScheduleSchema], // Embed the ScheduleSchema as an array
    doctorsData:[doctorsData]
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctors", DoctorSchema);

module.exports = Doctor;
