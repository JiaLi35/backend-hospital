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

// GET patient profile (1 patient)
const getPatient = async (user_id) => {
  return await Patient.findOne({ user_id: user_id });
};

// update patient profile details
const updatePatient = async (id, phone_number) => {
  const updatedPatient = await Patient.findByIdAndUpdate(
    id,
    {
      phone_number,
    },
    {
      new: true,
    }
  );
  return updatedPatient;
};

module.exports = {
  newPatientProfile,
  getPatient,
  updatePatient,
};
