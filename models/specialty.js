const { Schema, model } = require("mongoose");

/* 
    Specialty model: 
    - specialty
*/

const specialtySchema = new Schema({
  specialty: {
    type: String,
    required: true,
  },
});

const Specialty = model("Specialty", specialtySchema);
module.exports = Specialty;
