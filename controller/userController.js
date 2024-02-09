const User = require("../models/user");
const { sendOtpMail } = require("../helpers/emailHelper.js");
const { generateOTP } = require("../helpers/otpHelper.js/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { mobileNo, email } = req.body;

        // Check if email or mobile number is found but not verified
        const emailFoundButNotVerified = await User.findOne({
            email,
            isVerified: false,
        });
        const mobileFoundButNotVerified = await User.findOne({
            mobileNo,
            isVerified: false,
        });

        if (emailFoundButNotVerified) {
            sendOtpMail(
                emailFoundButNotVerified.email,
                emailFoundButNotVerified.otp
            );
            return res
                .status(200)
                .json({
                    success: false,
                    message: "User found but not verified",
                });
        } else if (mobileFoundButNotVerified) {
            sendOtpMail(
                mobileFoundButNotVerified.email,
                mobileFoundButNotVerified.otp
            );
            return res
                .status(200)
                .json({
                    success: false,
                    message: "User found but not verified",
                });
        }

        // Check if email or mobile number is already in use
        const emailFound = await User.findOne({ email });
        const mobileFound = await User.findOne({ mobileNo });

        if (emailFound) {
            return res
                .status(500)
                .json({ success: false, message: "Email already in use" });
        } else if (mobileFound) {
            return res
                .status(500)
                .json({
                    success: false,
                    message: "Mobile number already in use",
                });
        } else {
            const otp = generateOTP();
            let password = req.body.password;

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword;

            const userData = {
                mobileNo,
                email,
                password,
                otp: otp,
                companyDashboardDetails: {},
            };

            const user = await User.create(userData);
            sendOtpMail(email, otp);

            return res.status(200).json({ success: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const verifyOTP = async (req, resp) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const user = await User.findOne({ email, otp });

        if (user) {
            user.isVerified = true;
            await user.save();
            console.log(user);
            resp.json({
                success: true,
                message: "Email verified successfully",
            });
        } else {
            resp.json({ success: false, message: "Invalid OTP" });
        }
    } catch (err) {
        resp.json({ success: false, message: err });
    }
};

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email });

        if (!userData || email != userData.email) {
            console.log("Invalid Email or Password");
            return res.status(400).send("Invalid Email or Password");
        }

        if (userData) {
            const passwordMatch = await bcrypt.compare(
                password,
                userData.password
            );

            if (passwordMatch) {
                const token = jwt.sign(
                    { _id: userData._id },
                    process.env.SECRET_KEY || "SECRET_KEY",
                    {
                        expiresIn: "24h",
                    }
                );

                res.status(200).send({
                    success: true,
                    message: "Signin Successful",
                    token,
                });
            } else {
                return res.status(400).send("Invalid Password");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// Update User profile
const profileUpdate = async (req, res) => {
    try {
        const { id } = req.account;
        const userData = req.body;
        if(userData.password){
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            userData.password = hashedPassword;
        }
        const dbUpdateUserData = await User.findByIdAndUpdate(id, userData);
        return res.status(200).json({ success: true, dbUpdateUserData });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// Add user in dashboard 
const addUserInDashboard = async (req, res) => {
    
}





const getDashboardDetails = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.admin._id });
        return res.status(200).json({ userData });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err });
    }
};

const updateDashboardDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const dashboardDetails = req.body;
        const dbUpdateUserData = await User.findByIdAndUpdate(id, {
            companyDashboardDetails: dashboardDetails,
        });
        return res.status(200).json({ success: true, dbUpdateUserData });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    registerUser,
    verifyOTP,
    signInUser,
    getDashboardDetails,
    updateDashboardDetails,
};
