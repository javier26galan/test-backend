const express = require("express");
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", isAuthenticated, userController.getUsers);
router.get("/:id", isAuthenticated, userController.getUserById);
router.post("/", isAuthenticated, userController.createUser);
router.put("/:id", isAuthenticated, userController.updateUser);
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
