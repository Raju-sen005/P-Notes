import React from 'react';
import { motion } from 'framer-motion';

const questionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 }
  })
};

const FAQs = () => {
  const faqs = [
    {
      question: "1. What is Perfect Pharmacy?",
      answer:
        "Perfect Pharmacy is an online platform providing quality pharmacy notes, books, quizzes, and sample papers to help students succeed in their studies.",
    },
    {
      question: "2. Are the study materials free?",
      answer:
        "Yes, many resources are free. However, we also offer premium content that provides even more value and depth.",
    },
    {
      question: "3. How do I download PDF notes or books?",
      answer:
        "Go to the respective section from the menu (Notes, Books, etc.) and click on the download button.",
    },
    {
      question: "4. Can I request specific study material?",
      answer:
        "Yes, you can email us your request at pharmacyperfect20@gmail.com.",
    },
    {
      question: "5. How do I contact support?",
      answer:
        "You can contact us directly via email or through our Contact page.",
    },
  ];

  return (
    <motion.div
      className="containe py-5 faq-page"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-primary mb-4 fw-bold"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Frequently Asked Questions
      </motion.h2>

      {faqs.map((item, i) => (
        <motion.div key={i} custom={i} variants={questionVariants}>
          <h5 className="text-success mt-4 fw-semibold">{item.question}</h5>
          <p>{item.answer}</p>
        </motion.div>
      ))}

      {/* Embedded Styles */}
      <style jsx>{`
        .faq-page {
          font-family: 'Poppins', sans-serif;
          line-height: 1.7;
        }

        h5 {
          font-size: 1.1rem;
        }

        p {
          font-size: 1rem;
          color: #333;
        }

        @media (max-width: 576px) {
          .faq-page {
            padding: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default FAQs;
