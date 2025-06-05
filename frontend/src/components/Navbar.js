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

    bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

    const handleShow = () => setIsOpen(true);
    const handleHide = () => setIsOpen(false);

    offcanvasEl.addEventListener("show.bs.offcanvas", handleShow);
    offcanvasEl.addEventListener("hide.bs.offcanvas", handleHide);

    return () => {
      offcanvasEl.removeEventListener("show.bs.offcanvas", handleShow);
      offcanvasEl.removeEventListener("hide.bs.offcanvas", handleHide);
    };
  }, []);

  useEffect(() => {
    // Close offcanvas on route change
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
        className="navbar navbar-light bg-white shadow-sm sticky-top border-bottom"
        style={{ height: navbarHeight, zIndex: 1045 }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          <Link
            className="navbar-brand d-flex flex-column align-items-start"
            to="/"
            style={{ lineHeight: "1" }}
          >
            <div className="d-flex flex-column">
              <span className="fw-bold fs-5 text-success">Perfect Pharmacy</span>
              <span
                className="text-muted small"
                style={{ fontSize: "11px", fontWeight: "400", marginTop: "-2px" }}
              >
                by Sunita
              </span>
            </div>
          </Link>

          <button
            className="btn btn-outline-success btn-sm rounded-pill px-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
            aria-label="Toggle menu"
          >
            <i className="bi bi-list me-2"></i> {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-backdrop="false"
        data-bs-scroll="false"
        ref={offcanvasRef}
        style={{ width: "260px" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-semibold text-success">Navigation</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3 px-4 py-3">
          <Link to="/" className="text-decoration-none text-dark fw-medium">
            <i className="bi bi-house me-2 text-success"></i> Home
          </Link>
          <Link to="/articles" className="text-decoration-none text-dark fw-medium">
            <i className="bi bi-journal-text me-2 text-success"></i> Articles
          </Link>
          <Link to="/videos" className="text-decoration-none text-dark fw-medium">
            <i className="bi bi-play-circle me-2 text-success"></i> Videos
          </Link>
          <Link to="/quizzes" className="text-decoration-none text-dark fw-medium">
            <i className="bi bi-question-circle me-2 text-success"></i> MCQ Quizzes
          </Link>
          <Link to="/contact" className="text-decoration-none text-dark fw-medium">
            <i className="bi bi-envelope me-2 text-success"></i> Contact
          </Link>

          <hr />

          {/* User Auth Links */}
          <Link to="/login" className="text-decoration-none text-dark fw-medium">
            <i className="bi bi-box-arrow-in-right me-2 text-success"></i> User Login
          </Link>
          <Link to="/register" className="text-decoration-none text-dark fw-medium">
            <i className="bi bi-person-plus me-2 text-success"></i> Register
          </Link>

          {/* Admin Auth Link */}
          <Link to="/admin/login" className="text-decoration-none text-dark fw-medium">
            <i className="bi bi-person-lock me-2 text-success"></i> Admin Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
