const User = require("../Modals/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { registerMail } = require("../MailTemplate/registerMail");
const secret = process.env.SECRET;
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
    const { firstName, lastName, emailId, phoneNo, password, role } = req.body;

    const existingUser = await User.findOne({
      $or: [{ emailId }, { phoneNo }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: ERRORS.USER_EXISTS, status: false });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
      emailId: emailId,
      password: hash,
      role: role,
    });

    await user.save();
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

    const isUser = isNaN(Number(username))
      ? await User.findOne({ emailId: username })
      : await User.findOne({ phoneNo: username });

    if (isUser.isDeleted) {
      return res.status(400).json({ message: ERRORS.USER_ACCESS_REMOVED });
    }

    const isPasswordMatch = await bcrypt.compare(password, isUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: ERRORS.INVALID_CREDENTIALS });
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
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: ERRORS.INTERNAL_ERROR, error: e.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};
