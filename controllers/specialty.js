const Specialty = require("../models/specialty");

const getSpecialties = async () => {
  const specialties = await Specialty.find().sort({ _id: -1 });
  return specialties;
};

const getSpecialty = async (id) => {
  const specialty = await Specialty.findById(id);
  return specialty;
};

const addNewSpecialty = async (specialty) => {
  // 3. create new specialty in mongoDB
  const newSpecialty = new Specialty({
    specialty,
  });
  await newSpecialty.save();
  // 4. return the specialty wth the billplz url
  return newSpecialty;
};

const updateSpecialty = async (id, specialty) => {
  const updatedSpecialty = await Specialty.findByIdAndUpdate(
    id,
    {
      specialty,
    },
    {
      new: true,
    }
  );
  return updatedSpecialty;
};

const deleteSpecialty = async (id) => {
  return await Specialty.findByIdAndDelete(id);
};

module.exports = {
  getSpecialties,
  getSpecialty,
  addNewSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
