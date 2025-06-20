import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 🔁 Import Framer Motion

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container  "
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "11px",
        // backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
        //  backgroundImage: "url(https://img.freepik.com/free-photo/painted-solid-concrete-wall-textured-background_53876-101638.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
        // backgroundColor:"green",
        backgroundSize: "cover",
        zIndex: 1,
      }}
      >
      <motion.h2
        className="mb-4 fw-bold text-center text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        All Pharmacy Books
      </motion.h2>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          No books available.
        </motion.p>
      ) : (
        <motion.div
          className="row"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {books.map((book) => (
            <motion.div
              key={book._id}
              className="col-md-4 mb-4"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="card shadow-sm h-100 bg-white text-black"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (book.pdfUrl) {
                    window.open(
                      `http://localhost:5000${book.pdfUrl}`,
                      "_blank"
                    );
                  } else {
                    alert("PDF not available for this book.");
                  }
                }}
              >
                <div className="card-body bg-white" style={{ border: "transparent" }}>
                  <div className="d-flex align-items-center mb-2">
                    <span className="fs-3 me-2">📖</span>
                    <h5 className="card-title mb-0">{book.title}</h5>
                  </div>
                  <p className="mb-4 text-gray-700">Price: ₹{book.price}</p>
                  <p className="card-text">{book.author}</p>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/book-order", {
                        state: {
                          bookTitle: book.title,
                          bookPrice: book.price,
                          bookId: book._id,
                        },
                      });
                    }}
                    style={{ position: "relative", left: "171px" }}
                  >
                    Order Book
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Books;
