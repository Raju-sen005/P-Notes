import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-4 border-top">
      <div className="container">
        <div className="row">

          {/* Company Information */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold" style={{ color: '#247E84' }}>Perfect Pharmacy</h5>
            <p style={{ fontSize: '0.9rem' }}><br />
              Jaipur, Rajasthan, India<br />
              📞 +91 98876 95555<br />
              ✉️ pharmacyperfect20@gmail.com
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-dark text-decoration-none">About Us</a></li>
              <li><a href="/products" className="text-dark text-decoration-none">Products</a></li>
              <li><a href="/contact" className="text-dark text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-dark text-decoration-none">FAQs</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Legal</h6>
            <ul className="list-unstyled">
              <li><a href="/privacy-policy" className="text-dark text-decoration-none">Privacy Policy</a></li>
              <li><a href="/terms" className="text-dark text-decoration-none">Terms & Conditions</a></li>
              <li><a href="/refund-policy" className="text-dark text-decoration-none">Refund Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          {/* <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Subscribe to Our Newsletter</h6>
            <form>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
            </form>
          </div> */}

        </div>

        <hr />

        {/* Footer Bottom */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0" style={{ fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} Perfect Pharmacy. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="https://facebook.com/perfectpharmacy" className="text-dark me-3" aria-label="Facebook">
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a href="https://instagram.com/perfectpharmacy.in" className="text-dark me-3" aria-label="Instagram">
              <i className="bi bi-instagram fs-5"></i>
            </a>
            <a href="https://wa.me/919000000000" className="text-dark me-3" aria-label="WhatsApp">
              <i className="bi bi-whatsapp fs-5"></i>
            </a>
            <a href="https://t.me/perfectpharmacy" className="text-dark me-3" aria-label="Telegram">
              <i className="bi bi-telegram fs-5"></i>
            </a>
            <a href="https://youtube.com/@perfectpharmacy" className="text-dark me-3" aria-label="YouTube">
              <i className="bi bi-youtube fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
