const express = require("express");
const router = express.Router();
const { isAdmin, isDoctor } = require("../middleware/auth.js");
const {
  newDoctorProfile,
  getDoctors,
  getDoctor,
  updateDoctor,
  getDoctorById,
  deleteDoctor,
} = require("../controllers/doctor");
const { signup } = require("../controllers/user");

/* 
    Routes: 
    POST doctor profile 
    GET doctor profiles (for find a doctor page)
    GET doctor profile by user_id
    PUT doctor profile
*/

// GET /doctors (multiple doctors)
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

// GET /doctors/:id (get doctor by user_id)
router.get("/user/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const doctor = await getDoctor(user_id);
    res.status(200).send(doctor);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET /doctors/:id (get doctor by id)
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await getDoctorById(id);
    res.status(200).send(doctor);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// POST /doctors/new-profile
router.post("/new-profile", isAdmin, async (req, res) => {
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

// PUT /doctors/:id/update-profile
router.put("/update-profile/:id", isDoctor, async (req, res) => {
  try {
    const id = req.params.id;
    const biography = req.body.biography;
    const image = req.body.image;
    const udpatedDoctor = await updateDoctor(id, biography, image);
    res.status(200).send(udpatedDoctor);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoctor(id);
    res.status(200).send({ message: `Doctor with id ${id} has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
