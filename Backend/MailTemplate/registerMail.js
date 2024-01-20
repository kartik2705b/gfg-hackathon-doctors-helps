const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASS,
  },
});

const registerMail = async(emailId) => {
  const registerMailTemplate = {
    from: process.env.USER_MAIL,
    to: emailId,
    subject: "Registration Success",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <div href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">My Doctor</div>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing My Doctor.</p>
                <p style="font-size:0.9em;">Regards,<br />My Doctor</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>My Doctor Store</p>
                  <p>Heaven's Gate</p>
                  <p>Above Cloud's</p>
                </div>
              </div>
            </div>`,
  };

  try {
    transporter.sendMail(registerMailTemplate);
  } catch (e) {
    return res.status(500).json({
      message: ERRORS.INTERNAL_ERROR,
      error: e.message,
      status: false,
    });
  }
};

module.exports = {
    registerMail
}