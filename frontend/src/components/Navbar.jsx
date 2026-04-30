import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
        <p>Welcome, {localStorage.getItem("userEmail")} 👋</p>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/projects")}>Projects</button>
      <button onClick={() => navigate("/tasks")}>Tasks</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}