const express = require("express");
const router = express.Router();
const Blog = require("../functions/index"); // Blog Fonksiyonlarının dahil edilmesi
router.get("/", (req, res, next) => {
  res.render("index", { title: "Blog Page" });
});
/* Yeni Blog Yazısı Ekleme */
router.post("/newblog", (req, res, next) => {
  const { userID, blog } = req.body;
  Blog.addBlog(userID, blog)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
/* Blog yazısı detaylarını öğrenme */
router.get("/viewblog/:blogId", (req, res, next) => {
  Blog.getBlog(req.params.blogId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

/* Blog  için Action Atma */
router.put("/blogaction/:actionType/:userId/:blogId", (req, res, next) => {
  const { userId, blogId, actionType } = req.params;
  if (actionType < 0 && actionType > 5)
    res.json({ status: false, data: "Action Type Hatalı" });
  Blog.addBlogAction(userId, blogId, actionType)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

/* Blog Actions Listeleme */
router.get("/viewblogaction/:actionType/:blogId", (req, res, next) => {
  const { blogId, actionType } = req.params;
  if (actionType < 0 && actionType > 5)
    res.json({ status: false, data: "Action Type Hatalı" });
  Blog.getBlogAction(blogId, actionType)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
/* Blog için comment Atma */
router.post("/blog/comment", (req, res, next) => {
  const { userId, blogId, comment } = req.body;
  Blog.addComment(userId, blogId, comment)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});
/* Blog yazısı Comments yapanları Listeleme */
router.get("/viewblogcomment/:blogId", (req, res, next) => {
  Blog.getBlogAction(req.params.blogId, 4)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
