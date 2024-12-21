import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { uploadImage, createQuote } from "../utils/api";
import { useNavigate } from "react-router-dom";

const QuoteCreation = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [quoteText, setQuoteText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    try {
      const mediaUrl = await uploadImage(file);
      console.log(mediaUrl, "url");
      if (mediaUrl) {
        await createQuote(authToken, { text: quoteText, mediaUrl });
        alert("Quote created successfully!");
      }
    } catch (error) {
      console.log(error, "error");
      alert("Error creating quote");
    }
  };

  const handleList = () => {
    navigate("/quotes");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    },
    heading: {
      fontSize: "1.8rem",
      color: "#333",
      marginBottom: "15px",
    },
    inputContainer: {
      width: "100%",
      maxWidth: "500px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    textarea: {
      width: "100%",
      height: "120px",
      fontSize: "1rem",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxSizing: "border-box",
      resize: "vertical",
    },
    fileInput: {
      padding: "5px",
      fontSize: "1rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "15px",
    },
    button: {
      flex: 1,
      padding: "10px 15px",
      fontSize: "1rem",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    secondaryButton: {
      backgroundColor: "#6c757d",
    },
    secondaryButtonHover: {
      backgroundColor: "#565e64",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Quote</h2>
      <div style={styles.inputContainer}>
        <textarea
          style={styles.textarea}
          placeholder="Enter quote text"
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
        />
        <input type="file" style={styles.fileInput} onChange={handleFileChange} />
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={handleSubmit}
          >
            Submit Quote
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default QuoteCreation;
