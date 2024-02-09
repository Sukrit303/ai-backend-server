const express = require("express");
const router = express.Router();

const middleware = require("../middleware/account");
const { registerUser,
    verifyOTP,
    signInUser,
    profileUpdate,
    getDashboardDetails,
    updateDashboardDetails} = require("../controller/userController");

// Register User Route
router.post('/admin/register', registerUser);

// Verify OTP
router.put('/admin/verify-otp', verifyOTP);

// Sign In User
router.post('/admin/signin', signInUser);

// Update Account Details
router.put('/admin/update-user', middleware , profileUpdate);

// // Get Dashboard Details
// router.get('/admin/dashboard', middleware, getDashboardDetails);

// // Update Dashboard Details
// router.put('/admin/dashboard/:id', middleware, updateDashboardDetails);


module.exports = router