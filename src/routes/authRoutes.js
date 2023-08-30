// authRoutes.js

const express = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");
const isAuthenticated = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/logout", isAuthenticated, authController.logout);

module.exports = router;
