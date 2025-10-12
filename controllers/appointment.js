/* 
    GET appointments by patient id 
    GET appointments by doctor id 
    GET appointment by appointment id
    POST appointment
    PUT appointment (only date / time)
    DELETE appointment
*/

const Appointment = require("../models/appointment");

const getAppointmentsByDoctorId = async (doctorId, status) => {
  // filter for specialty
  let filter = { doctorId: doctorId };

  if (status) {
    filter.status = status;
  }
  const appointments = await Appointment.find(filter)
    .populate("specialty")
    .sort({ _id: -1 });
  return appointments;
};

const getAppointmentsByPatientId = async (patientId, status) => {
  // filter for specialty
  let filter = {
    patientId: patientId,
  };

  if (status) {
    filter.status = status;
  }

  const appointments = await Appointment.find(filter)
    .populate("specialty")
    .sort({ _id: -1 });
  return appointments;
};

const getAppointment = async (id) => {
  return await Appointment.findById(id).populate("specialty");
};

const newAppointment = async (
  doctorId,
  doctorName,
  specialty,
  dateTime,
  patientId,
  patientName,
  email,
  phone_number,
  nric
) => {
  const newAppointment = new Appointment({
    doctorId,
    doctorName,
    specialty,
    dateTime,
    patientId,
    patientName,
    email,
    phone_number,
    nric,
  });

  await newAppointment.save();
  return newAppointment;
};

module.exports = {
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  getAppointment,
  newAppointment,
};
