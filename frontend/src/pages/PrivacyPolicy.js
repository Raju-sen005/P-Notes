import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content:
        'We may collect your name, email address, and usage data when you visit or register on our website.',
    },
    {
      title: 'How We Use Your Information',
      list: [
        'To personalize user experience',
        'To improve our website and services',
        'To send relevant updates or resources (with your permission)',
      ],
    },
    {
      title: 'Data Security',
      content:
        'We take appropriate measures to protect your personal data from unauthorized access or disclosure.',
    },
    {
      title: 'Your Consent',
      content: 'By using our website, you consent to our privacy policy.',
    },
  ];

  return (
    <motion.div
      className="containe py-5 privacy-policy"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-primary mb-4 fw-bold"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Privacy Policy
      </motion.h2>

      <motion.p className="mb-4" variants={sectionVariants}>
        We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your
        information.
      </motion.p>

      {sections.map((sec, i) => (
        <motion.div key={i} custom={i} variants={sectionVariants}>
          <h5 className="text-success fw-semibold mt-4">{sec.title}</h5>
          {sec.content && <p>{sec.content}</p>}
          {sec.list && (
            <ul className="custom-list">
              {sec.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}

      <style jsx>{`
        .privacy-policy {
          font-family: 'Poppins', sans-serif;
          line-height: 1.7;
        }

        h5 {
          font-size: 1.15rem;
        }

        p {
          font-size: 1rem;
          color: #333;
        }

        .custom-list {
          padding-left: 1.5rem;
        }

        .custom-list li {
          margin-bottom: 0.5rem;
          list-style-type: disc;
        }

        @media (max-width: 576px) {
          .privacy-policy {
            padding: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default PrivacyPolicy;
