const { Schema, model } = require("mongoose");

/*
    user model: 
    - name
    - email (unique)
    - password
    - role 
*/

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure the email entered is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"], // enum to control the value for role (no random roles)
    default: "patient",
  },
});

const User = model("User", userSchema);

module.exports = User;
