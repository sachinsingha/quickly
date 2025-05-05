import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/quickly')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// News Schema
const newsSchema = new mongoose.Schema({
  title: Object, // Handles multi-language titles (e.g., { en: "Test News", hi: "टेस्ट न्यूज़" })
  summary: Object, // Handles multi-language summaries
  image: String,
  video: String,
  category: String,
  date: { type: Date, default: Date.now },
  language: String,
});
const News = mongoose.model('News', newsSchema);

// API Endpoints
app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const { title, summary, category } = req.body;
    if (!title || !summary || !category) {
      return res.status(400).json({ error: 'Title, summary, and category are required' });
    }
    const newNews = new News(req.body);
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({ error: 'Failed to add news' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));