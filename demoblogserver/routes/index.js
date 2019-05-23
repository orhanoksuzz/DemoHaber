const express = require("express");
const router = express.Router();
const MemberDetails = require("../models/MemberDetails");
const Blog = require("../models/Blog");
const Media = require("../models/Media");
const Comments = require("../models/Comments");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Api Anasayfa" });
});

// Tüm Kullanıcılar
router.get("/allmember", (req, res, next) => {
  const promise = MemberDetails.find({});
  promise
    .then(result => {
      res.json({ status: true, message: "Başarılı", veri: result });
    })
    .catch(err => {
      res.json({ status: false, message: err });
    });
});
// Tüm Blog Yazıları
router.get("/allblog", (req, res, next) => {
  const promise = Blog.find({});
  promise
    .then(result => {
      res.json({ status: true, message: result });
    })
    .catch(err => {
      res.json({ status: false, message: err });
    });
});
// Tüm Media
router.get("/allmedia", (req, res, next) => {
  const promise = Media.find({});
  promise
    .then(result => {
      res.json({ status: true, message: result });
    })
    .catch(err => {
      res.json({ status: false, message: err });
    });
});
// Tüm Yorumlar
router.get("/allcomments", (req, res, next) => {
  const promise = Comments.find({});
  promise
    .then(result => {
      res.json({ status: true, message: result });
    })
    .catch(err => {
      res.json({ status: false, message: err });
    });
});
module.exports = router;
