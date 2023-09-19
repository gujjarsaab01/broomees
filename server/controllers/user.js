const _ = require("lodash");
const User = require("../models/UserModel");

//controller function
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } =
      req.body;

      console.log(firstName, lastName, email, username, password)
    if (
      _.isEmpty(firstName) ||
      _.isEmpty(lastName) ||
      _.isEmpty(email) ||
      _.isEmpty(username) ||
      _.isEmpty(password) 
    ) {
      return res.status(400).json({
        message: "Invalid User data",
      });
      
    }


    //check user email is already exist
    const existingUser = await User.findOne({ email });
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password
    });
    console.log("User registered", newUser.toObject({ virtuals: true }));

    res.status(201).json({
      message: "User created successfully",
      data: newUser.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed. Please try again later.",
    });
  }
};

module.exports = { createUser };
