const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//get users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const fetchUser = await User.findById(userId);

    if (!fetchUser) {
      return res.status(404).send("User did't found");
    }

    console.log("Fetched User", fetchUser);
    console.log("User Fetched succesfully");
    res.status(200).json(fetchUser);
  } catch (error) {
    console.error("An error ocurred fetching the user:", error);
    res.status(500).send("An error ocurred fetching the user");
  }
};

//crear usuario
exports.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("New user created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
};

// Función para actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password, image } = req.body;
    console.log("username", username);
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        password: hashedPassword,
        image,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User did't found");
    }
    console.log("User updated", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("An error ocurred trying to update the user:", error);
    res.status(500).send("An error ocurred trying to update the user");
  }
};

// Función para borrar un usuario por su ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("User did't found");
    }

    console.log("Deleted User", deletedUser);
    res.status(200).send("User deleted Succesfully");
  } catch (error) {
    console.error("An error ocurred trying delete the user:", error);
    res.status(500).send("An error ocurred trying delete the user");
  }
};
