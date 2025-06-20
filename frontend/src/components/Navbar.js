import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

const Navbar = () => {
  const navbarHeight = 56;
  const [isOpen, setIsOpen] = useState(false);
  const offcanvasRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const offcanvasEl = offcanvasRef.current;
    if (!offcanvasEl) return;

    const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
    offcanvasEl.addEventListener("show.bs.offcanvas", () => setIsOpen(true));
    offcanvasEl.addEventListener("hide.bs.offcanvas", () => setIsOpen(false));

    return () => {
      offcanvasEl.removeEventListener("show.bs.offcanvas", () => setIsOpen(true));
      offcanvasEl.removeEventListener("hide.bs.offcanvas", () => setIsOpen(false));
    };
  }, []);

  useEffect(() => {
    const offcanvasEl = offcanvasRef.current;
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
  }, [location]);

  return (
    <>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-light bg-primary shadow-sm sticky-top border-bottom"
        style={{
          height: navbarHeight,
          zIndex: 1045,
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          <Link
            className="navbar-brand d-flex flex-column align-items-start"
            to="/"
            style={{ lineHeight: "1" }}
          >
            <div className="d-flex flex-column">
              <img
                src="https://ik.imagekit.io/galffwd0jy/IMG-20250527-WA0015.jpg?updatedAt=1748351017935"
                alt="Perfect Pharmacy"
                style={{
                  width: "36px",
                  borderRadius: "100%",
                  marginInline: "5px",
                }}
              />
              <span
                className="fw-bold fs-5 text-white"
                style={{ position: "absolute", left: "59px" }}
              >
                Perfect Pharmacy
              </span>
              <span
                className="text-white"
                style={{
                  fontSize: "11px",
                  fontWeight: "400",
                  marginTop: "-14px",
                  letterSpacing: "0.3px",
                  marginInline: "44px",
                }}
              >
                by Sunita
              </span>
            </div>
          </Link>

          <button
            className="btn btn-outline-white btn-sm rounded-pill px-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
            aria-label="Toggle menu"
          >
            <i className="bi bi-list me-2 text-white"></i>
          </button>
        </div>
      </nav>

      {/* Offcanvas Menu */}
      <div
        className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-backdrop="false"
        data-bs-scroll="false"
        ref={offcanvasRef}
        style={{
          width: "270px",
          backgroundColor: "#f8f9fa",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-semibold text-primary">Navigation</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column gap-3 px-4 py-3">
          {[
            { to: "/", icon: "house", text: "Home" },
            { to: "/articles", icon: "journal-text", text: "Articles" },
            { to: "/videos", icon: "play-circle", text: "Videos" },
            { to: "/quizzes", icon: "question-circle", text: "MCQ Quizzes" },
            { to: "/contact", icon: "envelope", text: "Contact" },
            { to: "/review", icon: "person-plus", text: "Review" },
          ].map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="text-decoration-none text-primary fw-medium d-flex align-items-center"
            >
              <i className={`bi bi-${link.icon} me-2 text-primary`}></i> {link.text}
            </Link>
          ))}

          <hr className="my-2" />

          {/* Auth Links */}
          {/* <h6 className="text-muted fw-bold mt-2">User Access</h6>
          <Link to="/login" className="text-decoration-none text-primary fw-medium d-flex align-items-center">
            <i className="bi bi-box-arrow-in-right me-2 text-primary"></i> User Login
          </Link>
          <Link to="/register" className="text-decoration-none text-primary fw-medium d-flex align-items-center">
            <i className="bi bi-person-plus me-2 text-primary"></i> Register
          </Link> */}

          {/* <h6 className="text-muted fw-bold mt-3">Admin Panel</h6> */}
          <Link to="/admin/login" className="text-decoration-none text-primary fw-medium d-flex align-items-center">
            <i className="bi bi-person-lock me-2 text-primary"></i> Admin Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
