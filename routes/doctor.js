const express = require("express");
const router = express.Router();
const {
  newDoctorProfile,
  getDoctors,
  getDoctor,
} = require("../controllers/doctor");
const { signup } = require("../controllers/user");

/* 
    Routes: 
    POST doctor profile 
    GET doctor profiles (for find a doctor page)
    GET doctor profile by user_id
    PUT doctor profile
*/

// GET doctor profiles (multiple doctors)
router.get("/", async (req, res) => {
  try {
    const specialty = req.query.specialty;
    const doctors = await getDoctors(specialty);
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET 1 doctor profile
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await getDoctor(id);
    res.status(200).send(doctor);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// POST /doctors/new-profile
router.post("/new-profile", async (req, res) => {
  try {
    const { name, email, specialty, password } = req.body;
    const newUser = await signup(name, email, password, (role = "doctor"));
    await newDoctorProfile(name, email, specialty, newUser._id);
    // DON'T CREATE COOKIE FROM THIS BECAUSE ADMIN IS ADDING THESE DOCTORS (don't want to log admin out and login doctor acc)
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
