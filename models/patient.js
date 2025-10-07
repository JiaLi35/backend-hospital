const { Schema, model } = require("mongoose");

/*
    patient model: 
    - name
    - email (unique)
    - NRIC no. 
    - phone number
    - user_id
*/

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure the email entered is unique
  },
  nric: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  // linkage between the patients and user (similar to SQL foreign key)
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Patient = model("Patient", patientSchema);

module.exports = Patient;
