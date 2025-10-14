// import model
const Appointment = require("../models/appointment");
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

  const doctors = await Doctor.find(filter)
    .populate("specialty")
    .sort({ _id: -1 });
  // .limit(itemsPerPage) // limit the number of items shown
  // .skip((page - 1) * itemsPerPage) // skip the amount of items
  return doctors;
};

// GET 1 doctor by user id
const getDoctor = async (user_id) => {
  return await Doctor.findOne({ user_id: user_id }).populate("specialty");
};

// GET 1 doctor by id
const getDoctorById = async (id) => {
  return await Doctor.findById(id).populate("specialty");
};

// Update doctors
const updateDoctor = async (id, biography, image) => {
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    id,
    {
      biography: biography,
      image: image,
    },
    {
      new: true,
    }
  );
  return updatedDoctor;
};

// delete doctor
const deleteDoctor = async (id) => {
  const existingAppointment = await Appointment.findOne({
    doctorId: id,
    status: { $nin: ["cancelled", "completed"] },
  });

  if (existingAppointment) {
    throw new Error("This doctor still has a pending appointment.");
  }

  return await Doctor.findByIdAndDelete(id);
};

module.exports = {
  newDoctorProfile,
  getDoctors,
  getDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
