import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";



export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    <button onClick={() => navigate("/login")}>
    Already have account? Login
    </button>

  const handleSignup = async () => {
    await API.post("/auth/signup", form);
    alert("Signup Successful");
    navigate("/login");
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}