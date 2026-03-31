const express = require("express");
const router = express.Router(); 

const {
    getUsers,
    getMyProfile,
    updateProfile,
    deleteProfile, 
    getUsersProfile,
} = require("./userController");
const isVerifyUser = require("../../middlewares/verifyUser");
const checkVerifiedUser = require("../../utils/checkVerifiedUser");




router.get("/", isVerifyUser,getUsers);
router.get("/profile", isVerifyUser, getMyProfile);
router.get("/profile/:userId", isVerifyUser, getUsersProfile);


router.put("/profile", isVerifyUser, updateProfile);
router.delete("/profile", isVerifyUser, deleteProfile);


 


module.exports = router;