const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  status: { type: String, default: "To Do" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
});

module.exports = mongoose.model("Task", taskSchema);