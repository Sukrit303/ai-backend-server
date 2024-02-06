const nodemailer = require('nodemailer');

const sendOtpMail = (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
    
      let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Account created successfully",
        text: `
                      Welcome to the Task Hour.,
                      Thank you for choosing us!
                      Your OTP is ${OTP}
                      `,
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return { error: error };
        } else {
          return resp.json({ success: true, message: info.response });
        }
      });
};

module.exports = {
  sendOtpMail,
};
