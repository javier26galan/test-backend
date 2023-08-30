const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const message = "Welcome to the Api Users";
  return res.status(200).json({message});
});

module.exports = router;
