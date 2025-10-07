const express = require("express");
const router = express.Router();
const { newPatientProfile } = require("../controllers/patient");
const { signup } = require("../controllers/user");
/* 
    Routes: 
    POST patient profile 
    GET patient profile by user_id
    PUT patient profile
*/

// POST /patients/new-profile-and-signup
router.post("/new-profile-and-signup", async (req, res) => {
  try {
    const { name, email, nric, phone_number, password } = req.body;
    const newUser = await signup(name, email, password);
    await newPatientProfile(name, email, nric, phone_number, newUser._id);
    // send the user back to create cookie
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
