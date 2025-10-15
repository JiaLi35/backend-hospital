const { Schema, model } = require("mongoose");

const queueSchema = new Schema({
  patient: {
    // linkage between the appointments and patients (similar to SQL foreign key)
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    // linkage between the appointments and doctors (similar to SQL foreign key)
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  appointment: {
    // linkage between the appointments and doctors (similar to SQL foreign key)
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const Queue = model("Queue", queueSchema);

module.exports = Queue;
