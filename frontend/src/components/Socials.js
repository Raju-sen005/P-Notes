import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      className="footer bg-light text-dark"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="containe py-5">
        <div className="row">

          {/* Company Info */}
          <motion.div className="col-md-3 mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h5>Perfect Pharmacy</h5>
            <p className="small mb-0">
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
          >
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              {["About Us", "Contact", "FAQs"].map((txt, i) => (
                <li key={i}>
                  <Link to={`/${txt.toLowerCase().replace(/ /g, "-")}`}>{txt}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div className="col-md-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h6>Legal</h6>
            <ul className="list-unstyled">
              {["Privacy Policy", "Terms & Conditions", "Refund Policy"].map((txt, i) => (
                <li key={i}>
                  <Link to={`/${txt.toLowerCase().replace(/ /g, "-")}`}>{txt}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <hr />

        <motion.div className="row align-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="col-md-6 text-center text-md-start small">
            &copy; {new Date().getFullYear()} Perfect Pharmacy. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            {["facebook", "instagram", "whatsapp", "telegram", "youtube"].map((network) => (
              <motion.a
                key={network}
                href={`https://${network}.com/perfectpharmacy`}
                className="social-icon mx-2"
                aria-label={network}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
              >
                <i className={`bi bi-${network} fs-5`}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx="true">{`
        .footer a {
          color: #343a40;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer a:hover {
          color: #0d6efd;
        }
        .social-icon {
          color: #343a40;
          transition: color 0.2s ease;
        }
        .social-icon:hover {
          color: #0d6efd;
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;
