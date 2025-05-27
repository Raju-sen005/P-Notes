import React from 'react';
import CountUp from 'react-countup';

const Stats = () => {
  return (
    <div
      className="bg-light py-5 mt-5 text-center"
      style={{
        position: 'relative',
        top: '-14pc',
        fontFamily: 'Noto Sans, sans-serif',
      }}
    >
      <h2
        className="fw-bold mb-4"
        style={{
          fontSize: '3rem', // Increased font size for the heading
        }}
      >
        You made us a Superhero <span className="text-danger">❤️</span>
      </h2>
      <div className="d-flex flex-wrap justify-content-center gap-5 text-dark fw-semibold">
        {[
          [39, 'Lakh+', 'VIEWS'],
          [74.5, 'K+', 'SUBSCRIBERS'],
          [233, '+', 'VIDEO LECTURES'],
          [3291, '+', 'QUESTIONS'],
          [230, '+', 'CHAPTER NOTES'],
        ].map(([number, suffix, label], i) => (
          <div key={i} className="text-center">
            <div
              className="stat-number"
              style={{
                fontSize: '2rem',
                fontWeight: '600',
              }}
            >
              <CountUp end={number} duration={2} separator="," />
              {suffix}
            </div>
            <div
              className="fw-normal"
              style={{
                fontSize: '0.9rem', // Reduced font size for labels
                fontWeight: '500',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
