const { Schema, model } = require("mongoose");

/*
    appointment model: 
    - id
    - doctor Id
    - doctor name
    - doctor specialty 
    - patient request / concern (not required) 
    - date / time
    - patient Id
    - patient name
    - patient email
    - patient phone number
    - patient nric no. 
*/

const appointmentSchema = new Schema({
  doctorId: {
    // linkage between the appointments and doctors (similar to SQL foreign key)
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  specialty: {
    type: Schema.Types.ObjectId,
    ref: "Specialty",
    required: true,
  },
  medical_concern: {
    type: String,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  patientId: {
    // linkage between the appointments and patients (similar to SQL foreign key)
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  nric: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "rescheduled", "cancelled"], // enum to control the value for role (no random roles)
    default: "scheduled",
    required: true,
  },
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
