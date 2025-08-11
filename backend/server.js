const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { nanoid } = require('nanoid');
require('dotenv').config(); // Load environment variables from .env file

// Import the URL model
const Url = require('./models/url');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON request bodies

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.error('MongoDB connection error:', err));


// --- API Routes ---

// Route to get all URL data for the admin page
// GET /api/urls
app.get('/api/urls', async (req, res) => {
  try {
    // Fetch all documents and sort them by creation date (newest first)
    const urls = await Url.find().sort({ createdAt: 'desc' });
    res.status(200).json(urls);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Server error while fetching URLs' });
  }
});

// Shorten a URL
// POST /api/shorten
app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  // Basic validation
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  try {
    // Check if the URL is already in the database
    let url = await Url.findOne({ originalUrl });

    if (url) {
      // If it exists, return the existing short URL
      return res.status(200).json(url);
    } else {
      // If it doesn't exist, create a new short code
      const shortCode = nanoid(7); // Generate a 7-character unique ID

      // Create a new URL document
      const newUrl = new Url({
        originalUrl,
        shortCode,
      });

      // Save it to the database
      await newUrl.save();
      
      return res.status(201).json(newUrl);
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});


// Redirect to the original URL
// GET /:shortcode
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find the URL document with the given short code
    const url = await Url.findOne({ shortCode });

    if (url) {
      // If found, increment the click count
      url.clicks++;
      await url.save();

      // Redirect the user to the original URL
      return res.redirect(url.originalUrl);
    } else {
      // If not found, send a 404 Not Found response
      return res.status(404).json({ error: 'No URL found' });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});


// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});