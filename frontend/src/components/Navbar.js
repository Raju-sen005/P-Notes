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
        className="navbar navbar-light bg-light shadow-sm sticky-top"
        style={{ height: navbarHeight }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link
            className="navbar-brand d-flex flex-column align-items-start"
            to="/"
            style={{ lineHeight: "1" }}
          >
            <div className="d-flex flex-column">
              <span className="fw-bold fs-5">NotesKarts</span>
              <span
                className="text-muted small"
                style={{ fontSize: "11px", fontWeight: "400", marginTop: "-2px" }}
              >
                MAKING NOTES SIMPLE
              </span>
            </div>
          </Link>

          <button
            className="btn btn-outline-secondary border-0 btn-sm"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
            aria-label="Toggle menu"
          >
            <i className="bi bi-list fs-6 me-1"></i> {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Offcanvas Top Menu */}
      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-backdrop="false"
        data-bs-scroll="false"
        ref={offcanvasRef}
        style={{
          height: "250px",
          top: `${navbarHeight}px`,
        }}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3">
          <Link to="/" className="text-decoration-none text-dark">
            Home
          </Link>
          <Link to="/articles" className="text-decoration-none text-dark">
            Articles
          </Link>
          <Link to="/videos" className="text-decoration-none text-dark">
            Videos
          </Link>
          <Link to="/about" className="text-decoration-none text-dark">
            About
          </Link>
          <Link to="/contact" className="text-decoration-none text-dark">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
