const express = require('express');
const shortid = require('shortid');
const Url = require('../models/Url');

const BASE_URL = 'http://localhost:5000';
const router = express.Router();

// Get all urls
exports.getUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    if (!urls) {
      return res.status(404).json('No data found');
    }
    res.render('index', { urls });
  } catch (error) {
    console.error(`Something went wrong =>${error.message}`);
    res.status(500).json('Server Error');
  }
};

// Post url
exports.addUrl = async (req, res) => {
  try {
    const urlCode = shortid.generate();
    let url = await Url.findOne({ longUrl: req.body.fullUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${BASE_URL}/${urlCode}`;
      url = new Url({
        longUrl: req.body.fullUrl,
        shortUrl,
        urlCode,
      });
      await url.save();
      res.redirect('/');
    }
  } catch (error) {
    console.error(`Something went wrong =>${error.message}`);
    res.status(500).json('Server Error');
  }
};

exports.getShortUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    }
    return res.status(404).json('No url found');
  } catch (error) {
    console.error('Something went wrong =>', error.message);
    res.status(500).json('Server error');
  }
};

module.export = router;
