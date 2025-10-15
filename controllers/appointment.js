/* 
    GET appointments by patient id 
    GET appointments by doctor id 
    GET appointment by appointment id
    POST appointment
    PUT appointment (only date / time)
    DELETE appointment
*/

const Appointment = require("../models/appointment");

const getAppointments = async (status) => {
  // filter for specialty
  let filter = {};

  if (status) {
    filter.status = status;
  }

  const appointments = await Appointment.find(filter)
    .populate([
      {
        path: "patientId",
      },
      {
        path: "doctorId",
        populate: {
          path: "specialty",
        },
      },
    ])
    .sort({ dateTime: 1 });
  // .limit(itemsPerPage) // limit the number of items shown
  // .skip((page - 1) * itemsPerPage) // skip the amount of items
  return appointments;
};

const getAppointmentsByDoctorId = async (doctorId, status) => {
  // filter for specialty
  let filter = { doctorId: doctorId };

  if (status) {
    filter.status = status;
  }
  const appointments = await Appointment.find(filter)
    .populate([
      {
        path: "patientId",
      },
      {
        path: "doctorId",
        populate: {
          path: "specialty",
        },
      },
    ])
    .sort({ dateTime: 1 });
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
    .populate([
      {
        path: "patientId",
      },
      {
        path: "doctorId",
        populate: {
          path: "specialty",
        },
      },
    ])
    .sort({ dateTime: 1 });
  return appointments;
};

const getAppointment = async (id) => {
  return await Appointment.findById(id).populate([
    {
      path: "patientId",
    },
    {
      path: "doctorId",
      populate: {
        path: "specialty",
      },
    },
  ]);
};

// Book a new appointment
const newAppointment = async (doctorId, dateTime, patientId) => {
  // Convert appointmentDate to a Date object
  const date = new Date(dateTime);

  // Define start and end of that day
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  // Check if patient already has an appointment booked that day
  const existingPatientAppointmentWithDoctor = await Appointment.findOne({
    doctorId,
    patientId,
    dateTime: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: "cancelled" }, // optional: ignore cancelled appointments
  });

  // Check if patient already has an appointment booked that day
  const existingPatientAppointment = await Appointment.findOne({
    patientId,
    dateTime: new Date(dateTime),
    status: { $ne: "cancelled" }, // optional: ignore cancelled appointments
  });

  // Check if that timeslot (of that day) has already been booked
  const existingDoctorAppointment = await Appointment.findOne({
    doctorId,
    dateTime: new Date(dateTime),
    status: { $ne: "cancelled" }, // optional: ignore cancelled appointments
  });

  if (existingPatientAppointmentWithDoctor) {
    throw new Error(
      "An appointment on this day for this doctor already exists"
    );
  } else if (existingDoctorAppointment) {
    throw new Error("This timeslot has already been taken.");
  } else if (existingPatientAppointment) {
    throw new Error("You already have an appointment at this time.");
  }

  const newAppointment = new Appointment({
    doctorId,
    dateTime,
    patientId,
  });

  await newAppointment.save();
  return newAppointment;
};

// Reschedule your existing appointment (date time only)
const updateAppointment = async (id, doctorId, patientId, dateTime) => {
  // // Convert appointmentDate to a Date object
  // const date = new Date(dateTime);

  // // Define start and end of that day
  // const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  // const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  // // Check if patient already has an appointment booked that day
  // const existingPatientAppointmentWithDoctor = await Appointment.findOne({
  //   doctorId,
  //   patientId,
  //   dateTime: { $gte: startOfDay, $lte: endOfDay },
  //   status: { $ne: "cancelled" }, // optional: ignore cancelled appointments
  // });

  // Check if patient already has an appointment booked that day
  const existingPatientAppointment = await Appointment.findOne({
    patientId,
    dateTime: new Date(dateTime),
    status: { $ne: "cancelled" }, // optional: ignore cancelled appointments
  });

  // Check if that timeslot (of that day) has already been booked
  const existingDoctorAppointment = await Appointment.findOne({
    doctorId,
    dateTime: new Date(dateTime),
    status: { $ne: "cancelled" }, // optional: ignore cancelled appointments
  });

  if (existingPatientAppointment) {
    throw new Error("You already have an appointment at this time.");
  } else if (existingDoctorAppointment) {
    throw new Error("This timeslot has already been taken by another patient.");
  }
  // } else if (existingPatientAppointmentWithDoctor) {
  //   throw new Error(
  //     "An appointment on this day for this doctor already exists"
  //   );
  // }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    id,
    {
      dateTime,
      status: "scheduled",
    },
    {
      new: true,
    }
  );
  return updatedAppointment;
};

const completeAppointment = async (id) => {
  const completedAppointment = await Appointment.findByIdAndUpdate(
    id,
    {
      status: "completed",
    },
    { new: true }
  );
  return completedAppointment;
};

const cancelAppointment = async (id) => {
  const cancelledAppointment = await Appointment.findByIdAndUpdate(
    id,
    { status: "cancelled" },
    { new: true }
  );
  return cancelledAppointment;
};

const checkInAppointment = async (id) => {
  const checkedInAppointment = await Appointment.findByIdAndUpdate(
    id,
    { status: "checked-in" },
    { new: true }
  );
  return checkedInAppointment;
};

// Delete appointments based on appointment ID
const deleteAppointment = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

module.exports = {
  getAppointments,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  getAppointment,
  newAppointment,
  updateAppointment,
  cancelAppointment,
  completeAppointment,
  checkInAppointment,
  deleteAppointment,
};
