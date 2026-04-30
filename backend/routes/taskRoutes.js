const express = require("express");
const router = express.Router();

const {
  createTask,
  getProjectTasks,
  updateStatus,
  getDashboard
} = require("../controllers/taskController");

const auth = require("../middleware/authMiddleware");

router.post("/create", auth, createTask);
router.get("/project/:projectId", auth, getProjectTasks);
router.put("/update-status", auth, updateStatus);
router.get("/dashboard", auth, getDashboard);

module.exports = router;