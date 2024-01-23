const userHistory = require("../Modals/userHistorySchema");
const doctorHistory = require("../Modals/doctorHistory");
const User = require("../Modals/userSchema");
const Doctor = require("../Modals/doctorSchema");

const ERRORS = {
    INTERNAL_ERROR: "Internal Server Error",
    ORDER_NOT_FOUND: "Order Not Found",
    BAD_REQUEST: "Bad Request Invalid data"
  };
  
  const getUserHistory = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 6;
  
      const skipCount = (page - 1) * limit;
      const history = await userHistory.find({ userId: req.user })
        .sort({ createdAt: -1 })
        .skip(skipCount)
        .limit(limit);
  
      return res.status(200).json({ message: "Success", history: history });
    } catch (error) {
      return res
        .status(500)
        .json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };

  const getDoctorHistory = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 6;
  
      const skipCount = (page - 1) * limit;
      const history = await doctorHistory.find({ doctorId: req.user })
        .sort({ createdAt: -1 })
        .skip(skipCount)
        .limit(limit);
  
      return res.status(200).json({ message: "Success", history: history });
    } catch (error) {
      return res
        .status(500)
        .json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };

  const createUserHistory = async (req, res) => {
    try {
        const {id , fees} = req.body;

        const template = {
            userId:req.user,
            doctorId:id,
            feesPaid:fees
        }

        const history = new userHistory(template);

        await history.save()

      return res.status(200).json({ message: "Success", history: history });
    } catch (error) {
      return res
        .status(500)
        .json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };

  const createDoctorHistory = async (req, res) => {
    try {
        const {id , fees} = req.body;

        const template = {
            doctorId:req.user,
            patientId:id,
            feesGot:fees
        }

        const history = new doctorHistory(template);

        await history.save()

      return res.status(200).json({ message: "Success", history: history });
    } catch (error) {
      return res
        .status(500)
        .json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
    }
  };


  module.exports={
    getUserHistory,
    getDoctorHistory,
    createUserHistory,
    createDoctorHistory
  }