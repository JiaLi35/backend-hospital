const express = require("express");
const router = express.Router();
const {
  getCurrentQueueNumber,
  addQueueNumber,
  getPatientQueueNumber,
} = require("../controllers/queue");
const { checkInAppointment } = require("../controllers/appointment");
const { isPatient } = require("../middleware/auth");

// POST /api/queues
router.post("/", isPatient, async (req, res) => {
  try {
    const { doctorId, patientId, appointmentId } = req.body;
    const newQueueNumber = await addQueueNumber(
      doctorId,
      patientId,
      appointmentId
    );
    await checkInAppointment(appointmentId);
    res.status(200).send(newQueueNumber);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// GET the current queue number (for a doctor)
router.get("/current-queue-number/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const queueNumber = await getCurrentQueueNumber(doctorId);
    res.status(200).send(queueNumber);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// GET patient's queue number (for that appointment)
router.get("/patient-queue-number/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const patientQueueNumber = await getPatientQueueNumber(appointmentId);
    res.status(200).send(patientQueueNumber);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
