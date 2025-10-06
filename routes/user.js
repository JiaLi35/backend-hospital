const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/user");

/*
    (login and signup always POST)
    POST /users/signup
    POST /users/login
*/

// POST /users/login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await login(email, password);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// POST /users/signup
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = await signup(name, email, password);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
