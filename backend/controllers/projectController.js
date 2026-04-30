const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      admin: req.user.id,
      members: [req.user.id]
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Member (Admin only)
exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ msg: "Project not found" });

    if (project.admin.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not authorized" });

    project.members.push(userId);
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get My Projects
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    }).populate("members", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};