/* 
    GET appointments 
    GET appointment by appointment id
    POST appointment
    PUT appointment (only date / time)
    DELETE appointment
*/

const Appointment = require("../models/appointment");

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

module.exports = { newAppointment };
