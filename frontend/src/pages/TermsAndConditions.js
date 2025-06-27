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

const TermsAndConditions = () => {
  const sections = [
    {
      title: 'Use of Content',
      content:
        'All content provided on this site is for educational purposes. Do not republish or resell our materials without permission.',
    },
    {
      title: 'User Conduct',
      list: [
        'Do not post harmful or misleading content',
        'Do not attempt to hack or disrupt the platform',
      ],
    },
    {
      title: 'Account Termination',
      content:
        'We reserve the right to terminate accounts found violating our policies.',
    },
    {
      title: 'Modifications',
      content:
        'We may update these terms without prior notice. Continued use means acceptance of the new terms.',
    },
  ];

  return (
    <motion.div
      className="container py-5 terms-page"
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
        Terms & Conditions
      </motion.h2>

      <motion.p className="mb-4" variants={sectionVariants}>
        By accessing this website, you agree to be bound by these terms and conditions.
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

      {/* Embedded CSS */}
      <style jsx>{`
        .terms-page {
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
          .terms-page {
            padding: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default TermsAndConditions;
