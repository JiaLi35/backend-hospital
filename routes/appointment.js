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
  updateAppointment,
  deleteAppointment,
  completeAppointment,
  cancelAppointment,
  getAppointments,
} = require("../controllers/appointment");
const {
  isPatient,
  isAdmin,
  isDoctor,
  isDoctorOrPatient,
} = require("../middleware/auth");
const { deleteQueueNumber } = require("../controllers/queue");
const router = express.Router();

// GET /appointments
router.get("/", async (req, res) => {
  try {
    const status = req.query.status;
    const appointments = await getAppointments(status);
    res.status(200).send(appointments);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET /appointments/doctor-appointments/:id (get doctor's appointments by doctor id)
router.get("/doctor-appointments/:id", async (req, res) => {
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

// GET /appointments/patient-appointments/:id (get patient's appointments by patient id)
router.get("/patient-appointments/:id", async (req, res) => {
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

// POST /appointments/new-appointment (patient only can book)
router.post("/new-appointment", isPatient, async (req, res) => {
  try {
    const { doctorId, dateTime, patientId } = req.body;
    const bookNewAppointment = await newAppointment(
      doctorId,
      dateTime,
      patientId
    );
    res.status(200).send(bookNewAppointment);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// PUT /appointments/:id (patients / doctors can reschedule)  (how to check middleware for this)
router.put("/update-appointment/:id", isDoctorOrPatient, async (req, res) => {
  try {
    const id = req.params.id;
    const { doctorId, patientId, dateTime } = req.body;
    const updatedAppointment = await updateAppointment(
      id,
      doctorId,
      patientId,
      dateTime
    );
    await deleteQueueNumber(id);
    res.status(200).send(updatedAppointment);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// PUT /appointments/complete-appointment/:id (doctor marks appointment as completed)
router.put("/complete-appointment/:id", isDoctor, async (req, res) => {
  try {
    const id = req.params.id;
    const completedAppointment = await completeAppointment(id);
    await deleteQueueNumber(id);
    res.status(200).send(completedAppointment);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// PUT /appointments/cancel-appointment/:id (patient / doctor cancels appointment) (how to check middleware for this)
router.put("/cancel-appointment/:id", isDoctorOrPatient, async (req, res) => {
  try {
    const id = req.params.id;
    const cancelledAppointment = await cancelAppointment(id);
    await deleteQueueNumber(id);
    res.status(200).send(cancelledAppointment);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// DELETE /appointments/:id
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAppointment(id);
    res
      .status(200)
      .send({ message: `Appointment with ${id} deleted successfully` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
