import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      alert(res.data.msg);

      localStorage.setItem("token", res.data.token);

      
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



