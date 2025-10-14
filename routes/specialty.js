const express = require("express");
// setup category router
const router = express.Router();
const {
  getSpecialties,
  getSpecialty,
  addNewSpecialty,
  updateSpecialty,
  deleteSpecialty,
} = require("../controllers/specialty");

/*
    GET /specialties
    GET /specialties/:id
    POST /specialties
    PUT /specialties/:id
    DELETE /specialties/:id
*/

// get specialties
router.get("/", async (req, res) => {
  try {
    const specialties = await getSpecialties();
    res.status(200).send(specialties);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Specialties not found." });
  }
});

// get specialty
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const specialty = await getSpecialty(id);
    res.status(200).send(specialty);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Specialty not found." });
  }
});

// add Specialty
router.post("/", async (req, res) => {
  try {
    const specialty = req.body.specialty;
    const newSpecialty = await addNewSpecialty(specialty);
    res.status(200).send(newSpecialty);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Something went wrong. Could not add specialty." });
  }
});

// update specialty
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const specialty = req.body.specialty;
    const updatedSpecialty = await updateSpecialty(id, specialty);
    res.status(200).send(updatedSpecialty);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Something went wrong. Could not update specialty." });
  }
});

// delete specialty
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteSpecialty(id);
    res
      .status(200)
      .send({ message: `Specialty with id ${id} has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
