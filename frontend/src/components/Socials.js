import React from 'react';

const Socials = () => {
  return (
    <div className="text-center mt-5" style={{
        position: "relative",
        top: "-13pc"
      }}>
      <h4 className="mb-3">Follow us on</h4>
      <div className="d-flex justify-content-center gap-4 fs-3">
        <a
          href="https://t.me/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
          aria-label="Telegram"
        >
          <i className="bi bi-telegram"></i>
        </a>
        <a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
          aria-label="YouTube"
        >
          <i className="bi bi-youtube"></i>
        </a>
        <a
          href="https://instagram.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
          aria-label="Instagram"
        >
          <i className="bi bi-instagram"></i>
        </a>
        <a
          href="https://wa.me/yourwhatsappnumber"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
          aria-label="WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=yourapp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
          aria-label="Android App"
        >
          <i className="bi bi-android2"></i>
        </a>
        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
          aria-label="Facebook"
        >
          <i className="bi bi-facebook"></i>
        </a>
      </div>
    </div>
  );
};

export default Socials;
