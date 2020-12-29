const express = require('express');
const articleController = require('../controllers/articles');
const router = express.Router();

router.get('/articles',articleController.getArticles);
router.post('/add-article',articleController.addArticle);

module.exports = router;