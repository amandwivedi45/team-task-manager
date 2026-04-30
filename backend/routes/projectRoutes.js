const express = require("express");
const router = express.Router();

const {
  createProject,
  addMember,
  getMyProjects
} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware");

router.post("/create", auth, createProject);
router.post("/add-member", auth, addMember);
router.get("/my-projects", auth, getMyProjects);

module.exports = router;