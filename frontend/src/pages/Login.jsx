import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      // ✅ store token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", form.email);

      alert("Login Successful");

      // ✅ redirect
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}