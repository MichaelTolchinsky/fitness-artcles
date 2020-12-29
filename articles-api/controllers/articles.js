const article = require("../models/article");
const Article = require("../models/article");

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();

    res.status(201).json({
      message: "Aricles fetched Successfully",
      articles,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch articles, try again later",
    });
  }
};

exports.addArticle = async (req, res) => {
  
  try {
    const newArticle = new Article({
      author: req.body.author,
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      date: req.body.date,
    });

    await newArticle.save();

    res.status(201).json({
      message: "Article created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "OOPS failed to create and save article",
    });
  }
};
