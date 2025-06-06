import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch (err) {
        setError("Failed to load books");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Available Books</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              width: "250px",
              background: "#f9f9f9"
            }}
          >
            <img
              src={book.coverImage || "https://p-notes-backend.onrender.com/api/books"}
              alt={book.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>Price: ₹{book.price}</p>
            <button onClick={() => alert("Buy functionality coming soon!")}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
