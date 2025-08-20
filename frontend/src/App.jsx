
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/homePage.jsx";
import Login from "./pages/loginRegister/Login.jsx";
import Signup from "./pages/loginRegister/Signup.jsx";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;   
