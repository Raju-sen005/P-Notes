import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Noteskarts Test Series',
      description: 'Join this Test Series to improve your knowledge.',
      buttonText: 'GO TO TEST',
      link: 'https://noteskarts.com/noteskarts-test-series/',
    },
    {
      title: 'AKTU Paper',
      description: 'Download Previous Year Paper PDF.',
      buttonText: 'GO TO PAPER',
      link: 'https://noteskarts.com/d-pharma-1st-year-question-paper-pdf/',
    },
    {
      title: 'Noteskarts D.Pharma App',
      description: 'Install Our App From Play Store.',
      buttonText: 'INSTALL NOW',
      link: 'https://play.google.com/store/apps/details?id=com.notekarts.dpharma',
    },
    {
      title: 'Question & Answers',
      description: 'Ask a question. Get a verified answer.',
      buttonText: 'GO TO QUESTION ANSWERS',
      link: 'https://noteskarts.com/question-answers/',
    },
  ];

  return (
    <div className="py-5 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <h2 className="fw-bold mb-5" style={{ fontSize: '2.3rem', color: '#00b894' }}>
        What's in for You?
      </h2>

      <div className="container">
        <div className="row justify-content-center g-4">
          {features.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-5" key={index}>
              <div
                className="h-100 p-4"
                style={{
                  borderRadius: '1rem',
                  border: '1px solid #dceae9',
                  boxShadow: '0 8px 20px rgba(0, 184, 148, 0.1)',
                  transition: 'transform 0.3s ease',
                  backgroundColor: '#ffffff',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <h4 style={{ fontWeight: 600, color: '#00b894' }}>{item.title}</h4>
                <p style={{ color: '#2d3436', fontSize: '1rem', marginTop: '0.5rem' }}>
                  {item.description}
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-100 mt-3"
                  style={{
                    backgroundColor: '#00b894',
                    color: '#fff',
                    fontWeight: 600,
                    padding: '0.6rem 1rem',
                    borderRadius: '0.5rem',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#019875'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00b894'}
                >
                  {item.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
