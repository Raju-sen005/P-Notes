import React, { useState } from 'react';

const Downloads = () => {
  const cards = [
    {
      img: 'https://img.freepik.com/premium-vector/medical-record-book-icon-showing-patient-data_98396-155374.jpg',
      alt: 'D. Pharm Notes',
      link: '',
      borderColor: '#00b894', // green
    },
    {
      img: 'https://img.freepik.com/premium-vector/medical-record-book-icon-showing-patient-data_98396-109836.jpg',
      alt: 'B. Pharm Notes',
      link: '',
      borderColor: '#0984e3', // blue
    },
    {
      img: 'https://img.freepik.com/premium-vector/online-quiz-app-interface-showing-test-results_98396-111460.jpg',
      alt: 'Quiz Time',
      link: '',
      borderColor: '#6c5ce7', // violet
    },
    {
      img: 'https://img.freepik.com/free-vector/illustration-contract-icon_53876-3305.jpg',
      alt: 'Sample Paper',
      link: '',
      borderColor: '#00cec9', // teal
    },
    {
      img: 'https://img.freepik.com/premium-vector/icon-photo-frame-related-photography-symbol-glyph-style-design-editable_1232792-6441.jpg',
      alt: 'Noteskarts Poster',
      link: '',
      borderColor: '#fd79a8', // pink
    },
    {
      img: 'https://img.freepik.com/free-vector/book-icon_632498-3975.jpg',
      alt: 'Noteskarts Book',
      link: '',
      borderColor: '#2ecc71', // green
    },
  ];

  const [hoverStates, setHoverStates] = useState(Array(cards.length).fill(false));

  const handleMouseEnter = (index) => {
    const newStates = [...hoverStates];
    newStates[index] = true;
    setHoverStates(newStates);
  };

  const handleMouseLeave = (index) => {
    const newStates = [...hoverStates];
    newStates[index] = false;
    setHoverStates(newStates);
  };

  return (
    <div className="text-center py-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem', color: '#00b894' }}>
        Download PDF Notes
      </h2>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {cards.map((card, i) => (
          <div
            className="card"
            key={i}
            style={{
              width: '18rem',
              borderRadius: '1.5pc',
              border: `2px solid ${card.borderColor}`,
              fontSize: '1.125rem',
              fontWeight: 600,
              boxShadow: `0 4px 12px ${card.borderColor}33`,
              transition: 'transform 0.3s ease',
              backgroundColor: '#ffffff',
            }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <div className="card-body text-center">
              <img
                src={card.img}
                alt={card.alt}
                className="mb-3 d-block mx-auto"
                style={{ width: '55%', borderRadius: '8px' }}
              />

              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#2d3436',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  textShadow: '0px 1px 1px rgba(0,0,0,0.05)',
                }}
              >
                {card.alt}
              </p>

              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-2 rounded-pill"
                style={{
                  backgroundColor: hoverStates[i] ? card.borderColor : '#ffffff',
                  color: hoverStates[i] ? '#ffffff' : card.borderColor,
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '0.5rem 1.5rem',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${card.borderColor}`,
                }}
              >
                Click here
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Downloads;
