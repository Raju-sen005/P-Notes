import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "B.Pharm Notes",
        "BCA Notes",
        "M.Sc Notes",
        "Engineering Notes",
        "MBA Notes",
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: false,
      cursorChar: "|",
      autoInsertCss: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center d-flex flex-column align-items-center">
        <img
          src="https://noteskarts.com/wp-content/uploads/2023/08/www.noteskarts.com_.png"
          alt="NotesKart Logo"
          className="mb-3"
          style={{
            maxWidth: '500px',
            position: 'relative',
            left: '25%',
            filter: 'hue-rotate(280deg)',
          }}
        />
        <h1
          className="fw-bold"
          style={{
            position: "relative",
            left: "-26%",
            top: "-25pc",
            fontSize: "32px",
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: "600",
          }}
        >
          Welcome to <span style={{ color: "#247E84" }}>NotesKart</span>
        </h1>
        <h4
          className="d-flex align-items-center justify-content-center gap-2 mt-3"
          style={{
            position: "relative",
            left: "-27.8%",
            top: "-25pc",
            fontSize: "1.5em",
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: "600",
          }}
        >
          <span>Search for</span>
          <span ref={typedRef} className="typed-text" />
        </h4>
        <p
          className="text-muted mt-2"
          style={{
            position: "relative",
            top: "-25pc",
            left: "-35.5%",
            color: "#000000",
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
          <strong>Making Notes Simple</strong>
        </p>
        <a
          href="https://www.youtube.com"
          className="btn btn-success mt-3"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "relative",
            top: "-25pc",
            left: "-36%",
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
          <i className="bi bi-youtube me-2"></i>
          <strong>Watch Videos</strong>
        </a>
     <a
  href="https://www.youtube.com"
  target="_blank"
  rel="noopener noreferrer"
  className="watch-now-btn"
>
  <i className="bi bi-play-circle-fill me-2"></i>
  Watch Now
</a>
<a
  href="https://whatsapp.com"
  className="chat-icon"
  title="Chat with us"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="bi bi-chat-dots-fill"></i>
</a>

      </div>
    </div>
  );
};

export default Hero;
