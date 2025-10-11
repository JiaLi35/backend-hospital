/* 
    GET appointments 
    GET appointment by appointment id
    POST appointment
    PUT appointment (only date / time)
    DELETE appointment
*/

const express = require("express");
const { newAppointment } = require("../controllers/appointment");
const router = express.Router();

// POST /appointments/new-profile
router.post("/new-appointment", async (req, res) => {
  try {
    const {
      doctorId,
      doctorName,
      specialty,
      dateTime,
      patientId,
      patientName,
      email,
      phone_number,
      nric,
    } = req.body;
    const bookNewAppointment = await newAppointment(
      doctorId,
      doctorName,
      specialty,
      dateTime,
      patientId,
      patientName,
      email,
      phone_number,
      nric
    );
    // DON'T CREATE COOKIE FROM THIS BECAUSE ADMIN IS ADDING THESE DOCTORS (don't want to log admin out and login doctor acc)
    res.status(200).send(bookNewAppointment);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
