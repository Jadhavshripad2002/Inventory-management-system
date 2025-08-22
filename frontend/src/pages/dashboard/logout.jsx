import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className="container mt-4">
      <h2>Welcome to Dashboard</h2>

      

      <div className="text-center mt-5">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
