import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Header = () => {
    const {authToken }= useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
    {authToken &&
    <header style={headerStyles} authToken={authToken}>
      {location.pathname !== "/quotes" && (
        <button
          style={buttonStyles}
          onClick={() => navigate("/quotes")}
        >
          Quote List
        </button>
      )}
      {location.pathname !== "/create-quote" && (
        <button
          style={buttonStyles}
          onClick={() => navigate("/create-quote")}
        >
          Create Quote
        </button>
      )}
    </header>
    }
    </>
  );
};

const headerStyles = {
  display:  "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  background: "#333",
  color: "#fff",
  position: "fixed",
  width: '100%'
};

const buttonStyles = {
  padding: "8px 16px",
  background: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Header;
