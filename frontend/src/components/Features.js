import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants = (isOdd) => ({
  hidden: { opacity: 0, x: isOdd ? 100 : -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
});

const paragraphVariants = (isOdd) => ({
  hidden: { opacity: 0, x: isOdd ? -100 : 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
});

const featureCardStyle = (isOdd) => ({
  borderRadius: '1.5rem',
  background: 'linear-gradient(to bottom right, #ffffff, #f9fffc)',
  boxShadow: '0 8px 30px rgba(0, 184, 148, 0.1)',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  padding: '2rem',
  height: '100%',
  margin: isOdd ? '0 0 0 auto' : '0 auto 0 0',
});

const iconStyle = {
  width: '64px',
  height: '64px',
  marginBottom: '1rem',
};

const titleStyle = {
  fontWeight: 700,
  color: '#00b894',
  fontSize: '1.4rem',
};

const descriptionStyle = {
  color: '#2d3436',
  fontSize: '1rem',
  marginTop: '0.5rem',
};

const textParagraphStyle = {
  fontSize: '1rem',
  color: '#636e72',
  padding: '0 1.5rem',
  lineHeight: '1.6',
};

const cardData = [
  {
    title: 'Noteskarts Test Series',
    description: 'Join this Test Series to improve your knowledge.',
    paragraph: 'Attempting test series regularly boosts confidence and helps identify weak areas.',
    link: '/pharmacy',
    img: 'https://img.icons8.com/fluency/96/test-passed.png',
    external: false,
  },
  {
    title: 'AKTU Paper',
    description: 'Download Previous Year Paper PDF.',
    paragraph: 'Solving previous year papers helps in understanding the exam pattern and important topics.',
    link: '/previous-papers',
    img: 'https://img.icons8.com/fluency/96/pdf.png',
    external: false,
  },
  {
    title: 'Noteskarts D.Pharma App',
    description: 'Install Our App From Play Store.',
    paragraph: 'Stay connected with pharmacy resources anytime, anywhere through our mobile app.',
    link: 'https://play.google.com/store',
    img: 'https://img.icons8.com/fluency/96/android-os.png',
    external: true,
  },
  {
    title: 'Question & Answers',
    description: 'Ask a question. Get a verified answer.',
    paragraph: 'Get accurate and verified answers to your academic doubts from experts and peers.',
    link: '/ask',
    img: 'https://img.icons8.com/fluency/96/help.png',
    external: false,
  },
];

const Features = () => (
  <motion.div
    className="py-5 text-center"
    style={{ fontFamily: 'Poppins, sans-serif', position: 'relative', top: '0px', overflow: 'hidden'
     }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
  >
    <motion.h2
      className="fw-bold mb-5 text-primary"
      style={{ fontSize: '2.5rem', color: '#00b894' }}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Practice & Revision Center
    </motion.h2>

    <div className="container d-flex flex-column gap-5">
      {cardData.map((item, i) => {
        const isOdd = i % 2 !== 0;
        const Wrapper = item.external ? 'a' : Link;

        return (
          <motion.div
            key={i}
            className="row align-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className={`col-12 col-md-6 mb-4 ${isOdd ? 'order-md-2 text-end' : 'order-md-1 text-start'}`}
              variants={cardVariants(isOdd)}
            >
              <Wrapper
                to={!item.external ? item.link : undefined}
                href={item.external ? item.link : undefined}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                style={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  width: '100%',
                  maxWidth: '450px',
                }}
              >
                <motion.div
                  className="feature-card"
                  style={{...featureCardStyle(isOdd),border:"1px solid #0D6EFD"}}
                  whileHover={{ y: -10, boxShadow: '0 16px 32px rgba(0, 184, 148, 0.15)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  <img src={item.img} alt={item.title} style={iconStyle} />
                  <h4 style={titleStyle}>{item.title}</h4>
                  <p style={descriptionStyle}>{item.description}</p>
                </motion.div>
              </Wrapper>
            </motion.div>

            <motion.div
              className={`col-12 col-md-6 ${isOdd ? 'order-md-1 text-start' : 'order-md-2 text-end'}`}
              variants={paragraphVariants(isOdd)}
            >
              <p style={textParagraphStyle}>{item.paragraph}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export default Features;