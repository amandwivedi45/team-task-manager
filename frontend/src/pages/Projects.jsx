import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects/my-projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!name) return alert("Enter project name");

    await API.post("/projects/create", { name });
    setName("");
    fetchProjects();
  };

  const addMember = async () => {
    if (!memberEmail || !selectedProjectId) {
      return alert("Enter email and select project");
    }

    try {
      // find user by email
      const resUser = await API.post("/auth/find-user", {
        email: memberEmail,
      });

      const userId = resUser.data._id;

      await API.post("/projects/add-member", {
        projectId: selectedProjectId,
        userId,
      });

      alert("Member added");
      setMemberEmail("");
      fetchProjects(); // refresh UI
    } catch (err) {
      alert("User not found");
    }
  };

  return (
    <div>
      <Navbar />

      <h2>Projects</h2>

      {/* Create Project */}
      <input
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createProject}>Create</button>

      {/* Add Member */}
      <h3>Add Member</h3>

      <select onChange={(e) => setSelectedProjectId(e.target.value)}>
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Enter member email"
        value={memberEmail}
        onChange={(e) => setMemberEmail(e.target.value)}
      />

      <button onClick={addMember}>Add Member</button>

      {/* Project List */}
      <h3>Project List</h3>

      {projects.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#f9f9f9",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h4>{p.name}</h4>

          <p><b>Members:</b></p>
          <ul>
            {p.members?.map((m) => (
              <li key={m._id}>
                {m.name} ({m.email})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}