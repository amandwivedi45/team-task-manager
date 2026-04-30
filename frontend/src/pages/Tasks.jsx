import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const [projectId, setProjectId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    assignedTo: ""
  });

  // Load projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects/my-projects");
    setProjects(res.data);
  };

  // Load tasks for selected project
  const fetchTasks = async (pid) => {
    const res = await API.get(`/tasks/project/${pid}`);
    setTasks(res.data);
  };

  const handleProjectChange = async (e) => {
  const pid = e.target.value;
  setProjectId(pid);

  const res = await API.get("/projects/my-projects");
  const selected = res.data.find((p) => p._id === pid);

  setMembers(selected.members);

  fetchTasks(pid);
};

  // Create task
  const createTask = async () => {
    if (!projectId) return alert("Select project first");

    await API.post("/tasks/create", {
      ...form,
      projectId
    });

    setForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      assignedTo: ""
    });

    fetchTasks(projectId);
  };

  // Update status
  const updateStatus = async (taskId, status) => {
    await API.put("/tasks/update-status", { taskId, status });
    fetchTasks(projectId);
  };

  return (
    <div>
        <Navbar />
      <h2>Tasks</h2>

      {/* Select Project */}
     <select
  onChange={(e) =>
    setForm({ ...form, assignedTo: e.target.value })
  }
>
  <option>Select Member</option>
  {members.map((m) => (
    <option key={m._id} value={m._id}>
      {m.name}
    </option>
  ))}
</select>

      {/* Create Task */}
      <div>
        <h3>Create Task</h3>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          placeholder="Assign User ID"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        />

        <button onClick={createTask}>Create Task</button>
      </div>

      {/* Task List */}
      <div>
        <h3>Tasks</h3>

        {tasks.map((t) => (
          <div key={t._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p><b>{t.title}</b></p>
            <p>{t.description}</p>
            <p>Status: {t.status}</p>

            <button onClick={() => updateStatus(t._id, "To Do")}>To Do</button>
            <button onClick={() => updateStatus(t._id, "In Progress")}>In Progress</button>
            <button onClick={() => updateStatus(t._id, "Done")}>Done</button>
          </div>
        ))}
      </div>
    </div>
  );
}