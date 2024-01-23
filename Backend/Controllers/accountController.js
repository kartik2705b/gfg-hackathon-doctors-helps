const User = require("../Modals/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { registerMail } = require("../MailTemplate/registerMail");
const secret = process.env.SECRET;
const Doctor = require("../Modals/doctorSchema");
dotenv.config();

const ERRORS = {
  USER_EXISTS: "User already exists",
  NO_USER: "No User Exists with the Given Mail Id/Mobile Number",
  USER_ACCESS_REMOVED: "User Access Denied Contact Customer Support",
  INVALID_CREDENTIALS: "Invalid Credentials",
  INTERNAL_ERROR: "Internal Server Error",
  BAD_REQUEST: "Bad Request Invalid Data Recived",
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, emailId, phoneNo, password, role , doctorsData} = req.body;
    let isAccount = {};

    isAccount = await User.findOne({
      $or: [{ emailId }, { phoneNo }],
    });

    if(!isAccount){
    isAccount =  await Doctor.findOne({
      $or: [{ emailId }, { phoneNo }],
    });
    }

    if (isAccount) {
      return res
        .status(400)
        .json({ message: ERRORS.USER_EXISTS, status: false });
    }

    const hash = await bcrypt.hash(password, 10);

      let template = {
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
      emailId: emailId,
      password: hash,
      role: role,
      doctorsData:doctorsData
    };

    if(role === "doctor"){
      const doctor = new Doctor(template);
      await doctor.save()
    }else{
      const user = new User(template);
      await user.save();
    }

    await registerMail(emailId);

    return res.status(200).json({
      message: "Registration Success",
      status: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ message: ERRORS.BAD_REQUEST, error: e.message, status: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username , password)

    const isUser = isNaN(Number(username))
      ? await User.findOne({ emailId: username })
      : await User.findOne({ phoneNo: username });

    if(!isUser){
      return res.status(400).json({ message: ERRORS.NO_USER , status: false});
    }

    if (isUser.isDeleted) {
      return res.status(400).json({ message: ERRORS.USER_ACCESS_REMOVED , status: false});
    }

    const isPasswordMatch = await bcrypt.compare(password, isUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: ERRORS.INVALID_CREDENTIALS , status:false});
    }

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: isUser._id,
      },
      secret
    );

    return res.status(200).json({
      message: `Welcome ${isUser.firstName}`,
      token: token,
      user: isUser,
      name:`${isUser.firstName} ${isUser.lastName}`,
      status:true
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: ERRORS.INTERNAL_ERROR, error: e.message , status:false});
  }
};

module.exports = {
  registerUser,
  loginUser
};
