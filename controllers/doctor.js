// import model
const Doctor = require("../models/doctor");

// POST to doctor profile information to doctors table
const newDoctorProfile = async (name, email, specialty, user_id) => {
  // create new doctor profile
  const newDoctorProfile = new Doctor({
    name,
    email,
    specialty,
    user_id,
  });
  // save the new doctor profile into mongodb
  await newDoctorProfile.save(); // clicking the "save" button
  return newDoctorProfile;
};

// GET all doctors
const getDoctors = async (specialty) => {
  // filter for specialty
  let filter = {};

  if (specialty) {
    filter.specialty = specialty;
  }

  const doctors = await Doctor.find(filter).populate("specialty");
  // .limit(itemsPerPage) // limit the number of items shown
  // .skip((page - 1) * itemsPerPage) // skip the amount of items
  // .sort({ _id: -1 });
  return doctors;
};

// GET 1 doctor
async function getDoctor(id) {
  return await Doctor.findById(id);
}

module.exports = {
  newDoctorProfile,
  getDoctors,
  getDoctor,
};
