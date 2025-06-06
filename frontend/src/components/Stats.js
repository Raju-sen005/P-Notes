import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState({
    views: 0,
    subscribers: 0,
    videos: 0,
    questions: 0,
    notes: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    [stats.views, '+', 'Total Views'],
    [stats.subscribers, '+', 'Users/Subscribers'],
    [stats.videos, '+', 'Video Lectures'],
    [stats.questions, '+', 'Practice Questions'],
    [stats.notes, '+', 'Notes'],
  ];

  return (
    <div className="py-5 mt-5 text-center" style={{ backgroundColor: '#f4fdfa', fontFamily: 'Noto Sans, sans-serif', color: '#2c3e50' }}>
      <h2 className="fw-bold mb-4" style={{ fontSize: '2.8rem', color: '#247E84' }}>
        Perfect Pharmacy by the Numbers
      </h2>
      <div className="d-flex flex-wrap justify-content-center gap-5 mt-4">
        {statItems.map(([number, suffix, label], i) => (
          <div key={i} className="text-center">
            <div style={{ fontSize: '2.2rem', fontWeight: '700', color: '#16a085' }}>
              <CountUp end={number} duration={2} separator="," />
              {suffix}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '500', marginTop: '0.4rem', color: '#34495e' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
