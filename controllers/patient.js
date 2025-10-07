// import model
const Patient = require("../models/patient");

// POST to patient profile information to patients table
const newPatientProfile = async (name, email, nric, phone_number, user_id) => {
  // create new product
  const newPatientProfile = new Patient({
    name,
    email,
    nric,
    phone_number,
    user_id,
  });
  // save the new product into mongodb
  await newPatientProfile.save(); // clicking the "save" button
  return newPatientProfile;
};

module.exports = {
  newPatientProfile,
};
