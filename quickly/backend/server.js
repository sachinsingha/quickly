// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/newsapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // News Schema
// const newsSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   date: { type: Date, default: Date.now },
// });
// const News = mongoose.model('News', newsSchema);

// // API Endpoints
// app.get('/api/news', async (req, res) => {
//   const news = await News.find();
//   res.json(news);
// });

// app.post('/api/news', async (req, res) => {
//   const newNews = new News(req.body);
//   await newNews.save();
//   res.json(newNews);
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//----
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/newsapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// News Schema
const newsSchema = new mongoose.Schema({
  title: Object, // Handles multi-language titles
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
  const news = await News.find();
  res.json(news); // Fixed typo from 'newnews' to 'news'
});

app.post('/api/news', async (req, res) => {
  const newNews = new News(req.body);
  await newNews.save();
  res.json(newNews);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));