const BASE_URL = 'http://localhost:5000';

const express = require('express');
const shortid = require('shortid');

const Url = require('../models/Url');

const router = express.Router();

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
    console.error(error.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
