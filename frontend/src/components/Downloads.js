import React, { useState } from 'react';

const Downloads = () => {
  const cards = [
    {
      img: 'https://noteskarts.com/wp-content/uploads/2023/08/Noteskarts-D.Pharma-Notes.png',
      alt: 'D. Pharm Notes',
      link: '',
    },
    {
      img: 'https://noteskarts.com/wp-content/uploads/2023/08/Noteskarts-B.Pharma-Notes.png',
      alt: 'B. Pharm Notes',
      link: '',
    },
    {
      img: 'https://noteskarts.com/wp-content/uploads/2023/08/Noteskarts-test-Series-1-1.png',
      alt: 'Quiz Time',
      link: '',
    },
    {
      img: 'https://noteskarts.com/wp-content/uploads/2023/08/Noteskarts-Sample-Paper-1.png',
      alt: 'Sample Paper',
      link: '',
    },
    {
      img: 'https://noteskarts.com/wp-content/uploads/2023/08/Noteskarts-poster.png',
      alt: 'Noteskarts Poster',
      link: '',
    },
    {
      img: 'https://noteskarts.com/wp-content/uploads/2023/08/Noteskarts-book.png',
      alt: 'Noteskarts Book',
      link: '',
    },
  ];

  // Initialize hover state for each button
  const [hoverStates, setHoverStates] = useState(Array(cards.length).fill(false));

  // Handle mouse enter event
  const handleMouseEnter = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  // Handle mouse leave event
  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  return (
    <div
      className="text-center py-5"
      style={{
        position: 'relative',
        top: '-13pc',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <h2
        className="fw-bold text-success mb-4"
        style={{ fontSize: '2.5rem' }}
      >
        Get Download PDF Notes
      </h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {cards.map((card, i) => (
          <div
            className="card"
            key={i}
            style={{
              width: '18rem',
              borderRadius: '1.5pc',
              border: '1px solid #247e84',
              fontFamily: 'Times New Roman, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 700,
            }}
          >
            <div className="card-body text-center">
              <img
                src={card.img}
                alt={card.alt}
                className="mb-3 d-block mx-auto hover-scale"
                style={{ width: '50%' }}
              />
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-2 rounded-pill"
                style={{
                  backgroundColor: hoverStates[i] ? '#247e84' : 'black',
                  color: '#fff',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  padding: '0.5rem 1.5rem',
                  transition: 'background-color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
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
