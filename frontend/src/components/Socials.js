import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      style={{ position: "relative", top: "0px",
       }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="social">
        <div className="row">

          {/* Company Info */}
          <motion.div className="col-md-3 mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h5>Perfect Pharmacy</h5>
            <p className="small">
              Jaipur, Rajasthan, India<br />
              📞 +91 98876 95555<br />
              ✉️ pharmacyperfect20@gmail.com
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="col-md-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              {["About Us", "Products", "Contact", "FAQs"].map((txt, i) => (
                <li key={i}><a href={`/${txt.toLowerCase().split(" ").join("-")}`}>{txt}</a></li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div className="col-md-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h6>Legal</h6>
            <ul className="list-unstyled">
              {["Privacy Policy", "Terms & Conditions", "Refund Policy"].map((txt, i) => (
                <li key={i}><a href={`/${txt.toLowerCase().split(" ").join("-")}`}>{txt}</a></li>
              ))}
            </ul>
          </motion.div>

          {/* CTA (Commented) */}
          {/* Add animation here if used */}
        </div>

        <hr />

        <motion.div className="row align-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="col-md-6 text-center text-md-start small">
            &copy; {new Date().getFullYear()} Perfect Pharmacy. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            {["facebook", "instagram", "whatsapp", "telegram", "youtube"].map((network) => (
              <motion.a
                key={network}
                href={`https://${network}.com/perfectpharmacy`}
                className={`social-icon ${network}`}
                aria-label={network}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <i className={`bi bi-${network} fs-5`}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .footer {
          {/* background: #f8f9fa; */}
          padding: 3rem 0 1rem;
          font-family: Poppins, sans-serif;
          color: #343a40;
        }
        .footer h5, .footer h6 {
          color: #0e6655;
          margin-bottom: 1rem;
        }
        .footer a {
          color: #343a40;
          text-decoration: none;
          transition: color .2s ease;
        }
        .footer a:hover {
          color: #ccc;
        }
        .subscribe-form {
          display: flex;
          max-width: 300px;
          margin: 0 auto;
        }
        .subscribe-form input {
          flex: 1;
          padding: .5rem;
          border: 1px solid #ced4da;
          border-radius: .25rem 0 0 .25rem;
        }
        .subscribe-form button {
          padding: .5rem 1rem;
          border: none;
          background: #0e6655;
          color: #fff;
          border-radius: 0 .25rem .25rem 0;
          cursor: pointer;
          transition: background .2s ease;
        }
        .subscribe-form button:hover {
          background: #0b4d42;
        }
        .social-icon {
          margin-left: 1rem;
          color: #343a40;
          transition: color .2s ease;
        }
        .social-icon:hover {
          color: blue;
        }
        @media (max-width: 768px) {
          .subscribe-form {
            flex-direction: column;
          }
          .subscribe-form input,
          .subscribe-form button {
            width: 100%;
            border-radius: .25rem;
            margin-bottom: .5rem;
          }
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;