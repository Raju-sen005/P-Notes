import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// Add new article (admin use)
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newArticle = new Article({ title, content });
    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all articles (for frontend)
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
