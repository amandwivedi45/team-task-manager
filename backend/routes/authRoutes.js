const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  findUser  
} = require("../controllers/authController");

// existing routes
router.post("/signup", signup);
router.post("/login", login);


router.post("/find-user", findUser);

module.exports = router;