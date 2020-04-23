const express = require('express');

const router = express.Router();

const { getUrls, addUrl, getShortUrl } = require('../controllers/urls');

router.route('/').get(getUrls);
router.route('/shorten').post(addUrl);
router.route('/:code').get(getShortUrl);

module.exports = router;
