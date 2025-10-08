const { Schema, model } = require("mongoose");

/*
    doctor model: 
    - name
    - email (unique)
    - specialty 
    - biography (not required) (because doctor can add in themselves later)
    - user_id
*/

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure the email entered is unique
  },
  specialty: {
    type: Schema.Types.ObjectId,
    ref: "Specialty",
    required: true,
  },
  biography: {
    type: String,
  },
  // linkage between the patients and user (similar to SQL foreign key)
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;
