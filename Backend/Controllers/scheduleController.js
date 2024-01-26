const Appoinment = require("../Modals/scheduleSchema");
const ERRORS = {
    BAD_REQUEST: "Bad request Invalid data recieved",
    USER_NOT_FOUND: "User not found by given id",
    INTERNAL_ERROR: "Internal Server Error",
  };

  const createAppoinment = async(req , res) =>{
    try{
        const {doctorId , date , time ,fees} = req.body.payload;
        const userId = req.user;
        const template = {
            doctorId:doctorId,
            userId:userId,
            date:date,
            time:time,
            fees:fees,
        }

        const appointment = new Appoinment(template)
        
       await appointment.save();

       return res.status(200).json({message:"Appoinment created Sucess", status: true })
    }catch(error){
        return res.status(500).json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };

  const confirmAppoinment = async(req , res) =>{
    try{
        const appId = req.body.id;
        console.log(req.body)

       let appointment = await Appoinment.findById(appId);
    
       appointment.status = "confirmed"
        
       await appointment.save();

       return res.status(200).json({message:"Appoinment Confirmed", status: true })
    }catch(error){
        return res.status(500).json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };

  const cancelAppointment = async(req , res) =>{
    try{
       const appId = req.body.id;
       console.log(req.body)

       let appointment = await Appoinment.findById(appId);
    
       appointment.status = "cancelled"
        
       await appointment.save();

       return res.status(200).json({message:"Appoinment Cancelled", status: true })
    }catch(error){
        return res.status(500).json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };

  const getDoctorAppoinment = async(req , res) =>{
    try{
        const docId = req.user

       const appointments = await Appoinment.find({doctorId:docId});

       return res.status(200).json({message:"Sucess", status: true , appointments : appointments})
    }catch(error){
        return res.status(500).json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };

  const getUserAppoinment = async(req , res) =>{
    try{
        const userID = req.user

       const appointments = await Appoinment.find({userId:userID});

       return res.status(200).json({message:"Sucess", status: true , appointments : appointments})
    }catch(error){
        return res.status(500).json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };

  module.exports = {
    createAppoinment,
    confirmAppoinment,
    cancelAppointment,
    getDoctorAppoinment,
    getUserAppoinment,
  }