const Queue = require("../models/queue");

// add queue number for each doctor
const addQueueNumber = async (doctorId, patientId, appointmentId) => {
  const existingQueue = await Queue.findOne({
    doctor: doctorId,
    patient: patientId,
    appointment: appointmentId,
  });

  if (existingQueue) {
    throw new Error(
      "You've already checked in for this appointment with this doctor."
    );
  }

  const lastQueue = await Queue.findOne({
    doctor: doctorId,
  }).sort({ number: -1 });

  // Determine next queue number
  let nextNumber = lastQueue && lastQueue.number ? lastQueue.number + 1 : 1;

  const newQueueNumber = new Queue({
    doctor: doctorId,
    patient: patientId,
    appointment: appointmentId,
    number: nextNumber,
  });

  await newQueueNumber.save();
  return newQueueNumber;
};

// get current queue number of that doctor
const getCurrentQueueNumber = async (doctorId) => {
  const currentQueueNumber = await Queue.findOne({
    doctor: doctorId,
  }).sort({ number: 1 }); // sort ascending
  return currentQueueNumber;
};

// get patient's current queue number
const getPatientQueueNumber = async (appointmentId) => {
  const patientQueueNumber = await Queue.findOne({
    appointment: appointmentId,
  });
  return patientQueueNumber;
};

const deleteQueueNumber = async (appointmentId) => {
  const previousQueue = await Queue.findOne({
    appointment: appointmentId,
  });
  if (previousQueue) {
    return await Queue.findByIdAndDelete(previousQueue._id);
  }
};

module.exports = {
  addQueueNumber,
  getCurrentQueueNumber,
  getPatientQueueNumber,
  deleteQueueNumber,
};
