import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error("Error fetching articles:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="min-h-screen py-12 px-0"
      
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "11px",
        // backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
          backgroundImage: "url('https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg')",
        backgroundSize: "cover",
        zIndex: 1,
      }}
    >
      <motion.h2
        className="text-4xl font-bold text-center text-blue-700 mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        📰 Latest Articles
      </motion.h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse bg-white p-6 rounded-2xl shadow-md">
              <div className="h-48 bg-blue-100 rounded-xl mb-4"></div>
              <div className="h-6 bg-blue-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-blue-100 rounded w-full mb-2"></div>
              <div className="h-4 bg-blue-100 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-blue-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-600">No articles found.</p>
      ) : (
        <motion.div
          className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {articles.map(article => {
            const isExpanded = expanded[article._id];
            const shouldTruncate = article.content.length > 100;

            return (
              <motion.div
                key={article._id}
                className="bg-transparent rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col mb-2 relative"
                style={{ padding: '20px', border: 'transparent' }}
                // whileHover={{ scale: 1.03 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="rounded-xl mb-4 object-cover h-48 w-full"
                  />
                )}
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700 flex-grow text-sm leading-relaxed">
                  {isExpanded || !shouldTruncate
                    ? article.content
                    : article.content.slice(0, 100) + '...'}
                </p>

                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpand(article._id)}
                    className="text-sm text-blue-600 hover:underline mt-2 self-start"
                    style={{
                      border: "transparent",
                      background: "transparent",
                      position: "absolute",
                      left: "82%",
                      fontSize: "small",
                      color: "#0D6EFD",
                      textDecorationLine: "underline",
                    }}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default ArticleList;
