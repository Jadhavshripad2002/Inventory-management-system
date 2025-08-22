
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });
      alert(res.data.msg);
      navigate("/login"); // signup successful → redirect to login
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <label>Name</label>
          <input type="text"  value={name} onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
