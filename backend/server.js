const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

console.log(process.env.MONGO_URI);

const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);