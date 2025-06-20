import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Downloads = () => {
  const cards = [
    {
      img: "https://img.icons8.com/fluency/96/pdf.png",
      alt: "Notes",
      link: "/notes",
      borderColor: "#0D6EFD",
    },
    {
      img: "https://img.icons8.com/fluency/96/classroom.png",
      alt: "Courses",
      link: "/courses",
      borderColor: "#0D6EFD",
    },
    {
      img: "https://img.icons8.com/fluency/96/open-book.png",
      alt: "Books",
      link: "/books",
      borderColor: "#0D6EFD",
    },
    {
      img: "https://img.icons8.com/fluency/96/test-passed.png",
      alt: "Sample Papers",
      link: "/sample-papers",
      borderColor: "#0D6EFD",
    },
  ];

  return (
    <div
      className="text-center py-5"
      style={{
        // backgroundColor: "#f9fdfd",
        fontFamily: "Poppins, sans-serif",
        position: "relative",
        top: "0px",

      }}
    >
      <motion.h2
        className="fw-bold mb-4 text-primary"
        style={{ fontSize: "2.4rem", }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Download PDF
      </motion.h2>

      <div className="d-flex flex-wrap justify-content-center gap-4 px-3" style={{ width: "101%" }}>
        {cards.map((card, i) => (
          <Link to={card.link} key={i} style={{ textDecoration: "none" }}>
            <motion.div
              className="card text-center"
              style={{
                width: "13.5rem",
                borderRadius: "1.5pc",
                border: `2px solid ${card.borderColor}`,
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: `0 4px 12px ${card.borderColor}25`,
                backgroundColor: "transparent",
              }}
              whileHover={{
                y: -8,
                boxShadow: `0 8px 20px ${card.borderColor}55`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="card-body py-4">
                <img
                  src={card.img}
                  alt={card.alt}
                  className="mb-3 d-block mx-auto"
                  style={{ width: "60px", height: "60px" }}
                />
                <p
                  style={{
                    color: card.borderColor,
                    fontSize: "1.05rem",
                    margin: 0,
                  }}
                >
                  {card.alt}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Downloads;
