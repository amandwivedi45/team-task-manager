import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await API.get("/tasks/dashboard");
    setData(res.data);
  };

  return (
    <div>
      <Navbar />

      <h2>Dashboard</h2>

      <button onClick={() => navigate("/projects")}>
        Go to Projects
      </button>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
  <div style={{ border: "1px solid black", padding: "10px" }}>
    <h3>Total</h3>
    <p>{data.total}</p>
  </div>

  <div style={{ border: "1px solid black", padding: "10px" }}>
    <h3>To Do</h3>
    <p>{data.todo}</p>
  </div>

  <div style={{ border: "1px solid black", padding: "10px" }}>
    <h3>In Progress</h3>
    <p>{data.inProgress}</p>
  </div>

  <div style={{ border: "1px solid black", padding: "10px" }}>
    <h3>Done</h3>
    <p>{data.done}</p>
  </div>

  <div style={{ border: "1px solid black", padding: "10px" }}>
    <h3>Overdue</h3>
    <p>{data.overdue}</p>
  </div>
</div>

      <p>Total Tasks: {data.total}</p>
      <p>To Do: {data.todo}</p>
      <p>In Progress: {data.inProgress}</p>
      <p>Done: {data.done}</p>
      <p>Overdue: {data.overdue}</p>
    </div>
  );
}