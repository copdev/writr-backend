const express = require("express");
const router = express.Router();
const multer = require("multer");

const Articles = require("../models/article");

// Upload and save Image with Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get All Articles
router.get("/", async (req, res) => {
  try {
    const data = await Articles.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// Add New Article
router.post("/add", upload.single("articleImage"), (req, res) => {
  const newArticle = new Articles({
    title: req.body.title,
    article: req.body.article,
    author: req.body.author,
    articleImage: req.file.originalname
  });

  newArticle
    .save()
    .then(() => {
      res.json("New Article posted successfully");
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Find Article by ID
router.get("/:id", (req, res) => {
  Articles.findById(req.params.id)
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Update Article by ID
router.put("/update/:id", upload.single("articleImage"), (req, res) => {
  Articles.findById(req.params.id)
    .then((article) => {
      article.title = req.body.title;
      article.article = req.body.article;
      article.author = req.body.author;
      article.articleImage = req.file.originalname;

      article.save().then(() => res.json("Article updated successfully!"));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete Article by ID
router.delete("/:id", (req, res) => {
  Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json("Article has been deleted successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
