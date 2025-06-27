import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navbarHeight = 56;
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const offcanvasRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Offcanvas toggle
  useEffect(() => {
    const offcanvasEl = offcanvasRef.current;
    if (!offcanvasEl) return;

    const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
    const showHandler = () => setIsOpen(true);
    const hideHandler = () => setIsOpen(false);

    offcanvasEl.addEventListener("show.bs.offcanvas", showHandler);
    offcanvasEl.addEventListener("hide.bs.offcanvas", hideHandler);

    return () => {
      offcanvasEl.removeEventListener("show.bs.offcanvas", showHandler);
      offcanvasEl.removeEventListener("hide.bs.offcanvas", hideHandler);
    };
  }, []);

  // Decode JWT and set user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  // Close offcanvas and dropdown on route change
  useEffect(() => {
    const offcanvasEl = offcanvasRef.current;
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
    setShowMenu(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowMenu(false);
    navigate("/");
  };

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-light bg-primary shadow-sm sticky-top border-bottom"
        style={{ height: navbarHeight, zIndex: 1045 }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          <Link className="navbar-brand d-flex flex-column align-items-start" to="/">
            <div className="d-flex flex-column">
              <img
                src="https://ik.imagekit.io/galffwd0jy/IMG-20250527-WA0015.jpg?updatedAt=1748351017935"
                alt="Perfect Pharmacy"
                style={{ width: "36px", borderRadius: "100%", marginInline: "5px" }}
              />
              <span className="fw-bold fs-5 text-white" style={{ position: "absolute", left: "59px" }}>
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

          {/* Show only if user is logged in */}
          {user && (
            <div
              className="u-icon position-relative"
              ref={dropdownRef}
              style={{
                left: "41%",
                top: "-2px",
              }}
            >
              <i
                className="bi bi-person-circle text-white fs-4"
                style={{ cursor: "pointer" }}
                onClick={toggleMenu}
              ></i>

              {showMenu && (
                <div
                  className="position-absolute end-0 mt-2"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    minWidth: "160px",
                    zIndex: 9999,
                  }}
                >
                  <div className="px-3 py-2">
                    <div className="fw-semibold text-dark mb-2">
                      <i
                        className="bi bi-person-circle text-primary fs-5"
                        style={{ position: "relative", left: "-3px", top: "2px" }}
                      ></i>{" "}
                      {user.name}
                    </div>
                    <button
                      className="btn btn-sm btn-danger w-100 rounded-pill"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Menu toggle button */}
          <button
            className="b-nav btn btn-sm rounded-pill px-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
            aria-label="Toggle menu"
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
              boxShadow: "none",
            }}
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
          {/* Main Links */}
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
          <Link
            to="/auth/login"
            className="auth text-decoration-none text-primary fw-medium d-none align-items-center"
          >
            <i className="bi bi-box-arrow-in-right me-2 text-primary"></i> Login
          </Link>

          {/* <h6 className="text-muted fw-bold mt-3">Admin Panel</h6>
          <Link
            to="/admin/login"
            className="text-decoration-none text-primary fw-medium d-flex align-items-center"
          >
            <i className="bi bi-person-lock me-2 text-primary"></i> Admin Login
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;