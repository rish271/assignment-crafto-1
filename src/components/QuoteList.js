import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { fetchQuotes } from "../utils/api";

const QuoteList = () => {
  const { authToken } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadQuotes = async () => {
    try {
      const data = await fetchQuotes(authToken, 20, offset);
      if (data.length === 0) setHasMore(false);
      setQuotes((prev) => [...prev, ...data]);
      setOffset((prev) => prev + 20);
    } catch (error) {
      alert("Error fetching quotes");
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const containerStyle = {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  };

  const titleStyle = {
    textAlign: "center",
    marginTop: "45px",
    color: "#333",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    marginBottom: "16px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  };

  const imageStyle = {
    display: "block",
    width: "100%",
    height: "auto", // Maintain aspect ratio
  };

  const overlayStyle = {
    position: "relative",
    background: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    width: "100%",
    padding: "16px",
    textAlign: "center",
  };

  const footerStyle = {
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    background: "#f9f9f9",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#666",
  };

  const buttonStyle = {
    margin: "20px auto",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };
  function formatDate(isoDate) {
    const date = new Date(isoDate);
  
    // Extract the components
    const options = {
      year: "numeric",
      month: "long", // Full month name
      day: "numeric", // Numeric day
      hour: "2-digit", // Two-digit hour
      minute: "2-digit", // Two-digit minute
      hour12: true, // Use 12-hour clock
    };
  
    return date.toLocaleString("en-US", options);
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Quotes</h2>
      {quotes.map((quote) => (
        <div key={quote.id} style={cardStyle}>
          <img src={quote.mediaUrl} alt="quote" style={imageStyle} />
          <div style={overlayStyle}>{quote.text}</div>
          <div style={footerStyle}>
            <p>{quote.username}</p>
            <p>{formatDate(quote.createdAt)}</p>
          </div>
        </div>
      ))}
      {hasMore && (
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={loadQuotes}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default QuoteList;
