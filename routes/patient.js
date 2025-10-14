const express = require("express");
const router = express.Router();
const {
  newPatientProfile,
  getPatient,
  updatePatient,
  getPatientById,
} = require("../controllers/patient");
const { signup } = require("../controllers/user");
const { isPatient } = require("../middleware/auth");

/* 
    Routes: 
    POST patient profile 
    GET patient profile by user_id
    PUT patient profile
*/

// POST /patients/new-profile
router.post("/new-profile", async (req, res) => {
  try {
    const { name, email, nric, phone_number, password } = req.body;
    const newUser = await signup(name, email, password, (role = "patient"));
    await newPatientProfile(name, email, nric, phone_number, newUser._id);
    // send the user back to create cookie
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// GET /patients/user/:id (get patient by user_id)
router.get("/user/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const patient = await getPatient(user_id);
    res.status(200).send(patient);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// GET /patients/:id (get patient by patient id)
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await getPatientById(id);
    res.status(200).send(patient);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// PUT patients/update-profile/:id
router.put("/update-profile/:id", isPatient, async (req, res) => {
  try {
    const id = req.params.id;
    const phone_number = req.body.phone_number;
    const updatedPatient = await updatePatient(id, phone_number);
    res.status(200).send(updatedPatient);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
