import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navbarHeight = 56;
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const offcanvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Offcanvas toggle
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

  // Auto close menu on route change
  useEffect(() => {
    const offcanvasEl = offcanvasRef.current;
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
  }, [location]);

  // Decode JWT and set user
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded); // 🔍 यहाँ चेक करें
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      setUser(null);
    }
  }
}, [location]);
// rerun on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-light bg-primary shadow-sm sticky-top border-bottom"
        style={{ height: navbarHeight, zIndex: 1045 }}
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
                style={{ width: "36px", borderRadius: "100%", marginInline: "5px" }}
              />
              <span className="fw-bold fs-5 text-white" style={{ position: "absolute", left: "59px" }}>
                Perfect Pharmacy
              </span>
              <span className="text-white" style={{
                fontSize: "11px",
                fontWeight: "400",
                marginTop: "-14px",
                letterSpacing: "0.3px",
                marginInline: "44px",
              }}>
                by Sunita
              </span>
            </div>
          </Link>

          {user && (
            <div className="d-flex align-items-center gap-2 text-white">
              <i className="bi bi-person-circle"></i>
              <span className="fw-semibold">{user.name}</span>
              <button
                className="btn btn-sm btn-outline-light rounded-pill"
                onClick={handleLogout}
                style={{ padding: "2px 10px", fontSize: "12px" }}
              >
                Logout
              </button>
            </div>
          )}

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

          {/* Show user info or login/signup */}
          {/* {user ? (
            <>
              <h6 className="text-muted fw-bold mt-2">Welcome</h6>
              <span className="text-dark d-flex align-items-center">
                <i className="bi bi-person-circle me-2"></i> {user.name}
              </span>
              <Link
                to="/dashboard"
                className="text-decoration-none text-primary fw-medium d-flex align-items-center"
              >
                <i className="bi bi-speedometer2 me-2 text-primary"></i> Dashboard
              </Link>
              <button
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </>
          ) : (
            <> */}
              {/* <h6 className="text-muted fw-bold mt-2"></h6> */}
               <Link
                to="/auth/login"
                className="auth text-decoration-none text-primary fw-medium d-none align-items-center"
              >
                <i className="bi bi-box-arrow-in-right me-2 text-primary"></i> Login
              </Link>
          //   </>
          // )} 

          <h6 className="text-muted fw-bold mt-3">Admin Panel</h6>
          <Link
            to="/admin/login"
            className="text-decoration-none text-primary fw-medium d-flex align-items-center"
          >
            <i className="bi bi-person-lock me-2 text-primary"></i> Admin Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
