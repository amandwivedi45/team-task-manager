const Task = require("../models/Task");

const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ msg: "Project not found" });

    // Only admin can create tasks
    if (project.admin.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Only admin can create tasks" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      projectId
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Tasks by Project
exports.getProjectTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) return res.status(404).json({ msg: "Project not found" });

    let tasks = await Task.find({
      projectId: req.params.projectId
    }).populate("assignedTo", "name email");

    // 🔥 If not admin → only show assigned tasks
    if (project.admin.toString() !== req.user.id) {
      tasks = tasks.filter(
        (t) => t.assignedTo._id.toString() === req.user.id
      );
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Task Status
exports.updateStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    // Only assigned user can update
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const tasks = await Task.find();

    const total = tasks.length;

    const todo = tasks.filter(t => t.status === "To Do").length;
    const inProgress = tasks.filter(t => t.status === "In Progress").length;
    const done = tasks.filter(t => t.status === "Done").length;

    const overdue = tasks.filter(t => new Date(t.dueDate) < new Date()).length;

    res.json({
      total,
      todo,
      inProgress,
      done,
      overdue
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};