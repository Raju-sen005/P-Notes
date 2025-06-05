import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "B.Pharm Notes",
        "D.Pharm Notes",
        "Sample Papers",
        "MCQ Quizzes",
        "Practical Files",
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: false,
    });

    return () => typed.destroy();
  }, []);

  return (
    <div
      className="text-center py-5"
      style={{
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#f9fdfd',
        padding: '2rem',
      }}
    >
      <img
        src="https://ik.imagekit.io/galffwd0jy/IMG-20250527-WA0015.jpg?updatedAt=1748351017935"
        alt="Perfect Pharmacy Logo"
        className="mb-3"
        style={{
          maxWidth: '280px',
          width: '100%',
        }}
      />

      <h1 className="fw-bold" style={{ fontSize: '2.5rem', color: '#247E84' }}>
        Welcome to Perfect Pharmacy
      </h1>

      <h4
        className="mt-3"
        style={{
          fontSize: '1.3rem',
          fontWeight: 600,
          fontFamily: 'Noto Sans, sans-serif',
          color: '#2d3436',
        }}
      >
        <span>Search for </span>
        <span
          ref={typedRef}
          style={{
            color: '#0984e3',
            display: 'inline-block',
            minWidth: '200px', // ✅ fixes jumpy layout
            textAlign: 'left',
          }}
        />
      </h4>

      <p className="mt-3" style={{ fontSize: '1rem', color: '#636e72' }}>
        <strong>Making Pharmacy Notes Simple & Accessible</strong>
      </p>

      <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
        <a
          href="https://www.youtube.com"
          className="btn btn-success"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'Poppins, sans-serif',
            padding: '0.6rem 1.4rem',
            fontWeight: 600,
            borderRadius: '999px',
            fontSize: '1rem',
          }}
        >
          <i className="bi bi-youtube me-2"></i>
          Watch Videos
        </a>

        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary"
          style={{
            fontFamily: 'Poppins, sans-serif',
            padding: '0.6rem 1.4rem',
            fontWeight: 600,
            borderRadius: '999px',
            fontSize: '1rem',
          }}
        >
          <i className="bi bi-play-circle-fill me-2"></i>
          Watch Now
        </a>

        <a
          href="https://whatsapp.com"
          className="btn btn-outline-success"
          title="Chat with us"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'Poppins, sans-serif',
            padding: '0.6rem 1.4rem',
            fontWeight: 600,
            borderRadius: '999px',
            fontSize: '1rem',
          }}
        >
          <i className="bi bi-chat-dots-fill me-2"></i>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Hero;