const Doctor = require("../Modals/doctorSchema")
const dotenv = require("dotenv");
const secret = process.env.SECRET;
const doctorMapping = require("../Modals/doctorMappingSchema");
dotenv.config();

const ERRORS = {
  USER_EXISTS: "User already exists",
  NO_USER: "No User Exists with the Given Mail Id/Mobile Number",
  USER_ACCESS_REMOVED: "User Access Denied Contact Customer Support",
  INVALID_CREDENTIALS: "Invalid Credentials",
  INTERNAL_ERROR: "Internal Server Error",
  BAD_REQUEST: "Bad Request Invalid Data Recived",
};

const setDoctorMapping = async (req, res) => {
  try {
    const doctorId = req.user;
    const { roomId } = req.body;
    const existingUser = await doctorMapping.findOne({
      $or: [{ doctorId }, { roomId }],
    });
    if (existingUser) {
      await doctorMapping.findByIdAndDelete(existingUser._id);
    }

    const docMapping = new doctorMapping({
      doctorId: doctorId,
      roomId: roomId,
    });

    docMapping.save();

    return res.status(200).json({
      message: "Doctor Mapping Success",
      status: true,
      docMapped: docMapping,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ message: ERRORS.BAD_REQUEST, error: e.message, status: false });
  }
};

const removeDoctorMapping = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const mappedData = await doctorMapping.findOne({ roomId: roomId });

    await doctorMapping.findByIdAndDelete(mappedData._id);

    return res
      .status(200)
      .json({ message: "Mapping Removed Success", status: true });
  } catch (e) {
    return res
      .status(400)
      .json({ message: ERRORS.BAD_REQUEST, error: e.message, status: false });
  }
};

const findMappedDoctors = async (req, res) => {
  try {
    const doctorIDs = await doctorMapping.find().sort({ createdAt: -1 });
    const doctorIds = doctorIDs.map((item) => item.doctorId);

    const doctors = await Doctor.find({ _id: { $in: doctorIds } });

    return res
      .status(200)
      .json({ message: "success", status: true, ids: doctors });
  } catch (e) {
    return res
      .status(400)
      .json({ message: ERRORS.BAD_REQUEST, error: e.message, status: false });
  }
};

const getDoctorRoomID = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const doctorMappedData = await doctorMapping.find({ doctorId });

    return res
      .status(200)
      .json({
        message: "success",
        status: true,
        mappedData: doctorMappedData[0].roomId,
      });
  } catch (e) {
    return res
      .status(400)
      .json({ message: ERRORS.BAD_REQUEST, error: e.message, status: false });
  }
};

const updateDoctorStatus = async (req, res) => {
  try {
    const _id = req.user;

    const doctor = await Doctor.findById(_id);

    // console.log(doctor)

    doctor.doctorsData[0].isAvailable = !doctor.doctorsData[0].isAvailable;

    await doctor.save();

    return res
      .status(200)
      .json({ message: "success", status: true, doctor: doctor });
  } catch (e) {
    return res
      .status(400)
      .json({ message: ERRORS.BAD_REQUEST, error: e.message, status: false });
  }
};

module.exports = {
  setDoctorMapping,
  removeDoctorMapping,
  findMappedDoctors,
  getDoctorRoomID,
  updateDoctorStatus,
};
