const BASE_URL = 'http://localhost:5000';

const express = require('express');
const shortid = require('shortid');

const Url = require('../models/Url');

const router = express.Router();

// Get all urls
router.get('/', async (req, res) => {
  try {
    const urls = await Url.find();
    if (!urls) {
      return res.status(404).json('No data found');
    }
    return res.send(urls);
  } catch (error) {
    console.error(`Something went wrong =>${error.message}`);
    res.status(500).json('Server Error');
  }
});

// Post url
router.post('/shorten', async (req, res) => {
  try {
    const { longUrl } = req.body;
    const urlCode = shortid.generate();
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${BASE_URL}/${urlCode}`;
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
      });
      await url.save();
      res.json(url);
    }
  } catch (error) {
    console.error(`Something went wrong =>${error.message}`);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
