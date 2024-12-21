import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    try {
      const data = await loginUser(username, otp);
      if (data.token) {
        setAuthToken(data.token);
        navigate("/create-quote");
        alert("Login successful!");
      }
    } catch (error) {
      console.log(error, "error");
      alert("Login failed. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f6f8",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    heading: {
      fontSize: "1.8rem",
      color: "#333",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "1rem",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "10px 15px",
      fontSize: "1rem",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginBottom: "10px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
