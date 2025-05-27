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
    <div className="features-container text-center py-5" style={{ position: 'relative', top: '-13pc' }}>
      <h1 className="mb-4">What's in for You?</h1>
      <div className="container">
        <div className="row justify-content-center g-4">
          {features.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-6" key={index}>
              <div
                className="card p-4 h-100"
                style={{
                  borderRadius: '0',
                  border: '1px solid #247e84',
                }}
              >
                <h2 className="h5">{item.title}</h2>
                <p>{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success mt-3 w-100"
                  style={{
                    padding: '0.6rem 1rem',
                    fontSize: '1rem',
                    borderRadius: '0.25rem',
                  }}
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
