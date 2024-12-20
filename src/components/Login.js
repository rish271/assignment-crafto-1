import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Login = () => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    try {
      const data = await loginUser(username, otp);
      if (data.token) {
        setAuthToken(data.token);
        navigate("/create-quote");
        // alert('Login successful!');
        alert("Login successful!");
      }
    } catch (error) {
      console.log(error, "error");
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
