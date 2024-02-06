const express = require("express");
const router = express.Router();

const middleware = require("../middleware/account");
const { registerUser,
    verifyOTP,
    signInUser,
    getDashboardDetails,
    updateDashboardDetails} = require("../controller/userController");

// Register User Route
router.post('/admin/register', registerUser);

// Verify OTP
router.put('/admin/verify-otp', verifyOTP);

// Sign In User
router.post('/admin/signin', signInUser);

// Update Account Details



module.exports = router