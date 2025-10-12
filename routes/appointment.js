/* 
    GET appointments by patient id 
    GET appointments by doctor id 
    GET appointment by appointment id
    POST appointment
    PUT appointment (only date / time)
    DELETE appointment
*/

const express = require("express");
const {
  newAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  getAppointment,
} = require("../controllers/appointment");
const router = express.Router();

// GET /appointments/doctor-appointment/:id (get doctor's appointments by doctor id)
router.get("/doctor-appointment/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const status = req.query.status;
    const doctorAppointments = await getAppointmentsByDoctorId(
      doctorId,
      status
    );
    res.status(200).send(doctorAppointments);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET /appointments/patient-appointment/:id (get patient's appointments by patient id)
router.get("/patient-appointment/:id", async (req, res) => {
  try {
    const patientId = req.params.id;
    const status = req.query.status;
    const patientAppointment = await getAppointmentsByPatientId(
      patientId,
      status
    );
    res.status(200).send(patientAppointment);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET /appointments/:id (get one appointment by id)
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await getAppointment(id);
    res.status(200).send(appointment);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

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
    res.status(200).send(bookNewAppointment);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
