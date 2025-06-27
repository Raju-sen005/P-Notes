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

const RefundPolicy = () => {
  const sections = [
    {
      title: 'Refund Eligibility',
      list: [
        'Refunds are only available for services or subscriptions purchased within the last 7 days.',
        'Proof of payment is required.',
      ],
    },
    {
      title: 'Non-refundable Items',
      list: [
        'Downloaded PDFs and materials',
        'One-time digital purchases',
      ],
    },
    {
      title: 'How to Request a Refund',
      content:
        'Email us at pharmacyperfect20@gmail.com with your order details. We’ll respond within 3 business days.',
    },
  ];

  return (
    <motion.div
      className="container py-5 refund-policy"
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
        Refund Policy
      </motion.h2>

      <motion.p className="mb-4" variants={sectionVariants}>
        We aim to provide clear and fair refund guidelines for all paid services on our platform.
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
        .refund-policy {
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
          .refund-policy {
            padding: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default RefundPolicy;
