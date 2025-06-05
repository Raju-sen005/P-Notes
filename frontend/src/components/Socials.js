import React from 'react';

const Socials = () => {
  return (
    <div className="text-center mt-5" style={{ position: 'relative' }}>
      <h4 className="mb-3 fw-bold" style={{ color: '#247E84', fontFamily: 'Poppins, sans-serif' }}>
        Stay Connected with <span style={{ color: '#0984e3' }}>Perfect Pharmacy</span>
      </h4>

      <div className="d-flex justify-content-center gap-4 fs-3">
        <a
          href="https://t.me/perfectpharmacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary"
          aria-label="Telegram"
        >
          <i className="bi bi-telegram"></i>
        </a>

        <a
          href="https://youtube.com/@perfectpharmacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-danger"
          aria-label="YouTube"
        >
          <i className="bi bi-youtube"></i>
        </a>

        <a
          href="https://instagram.com/perfectpharmacy.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-danger"
          aria-label="Instagram"
        >
          <i className="bi bi-instagram"></i>
        </a>

        <a
          href="https://wa.me/919000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-success"
          aria-label="WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=com.perfectpharmacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-success"
          aria-label="Android App"
        >
          <i className="bi bi-android2"></i>
        </a>

        <a
          href="https://facebook.com/perfectpharmacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary"
          aria-label="Facebook"
        >
          <i className="bi bi-facebook"></i>
        </a>
      </div>
    </div>
  );
};

export default Socials;