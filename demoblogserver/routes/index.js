const express = require("express");
const router = express.Router();
const Admin = require('../functions/sqeuelize/index');

router.get("/", (req, res, next) => {
  res.render("index", { title: "Api Anasayfa" });
});

// Tüm Kullanıcılar
router.get("/allmember", (req, res, next) => {
 
  Admin.AllMember()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});
// Tüm Blog Yazıları
router.get("/allblog", (req, res, next) => {
  Admin.AllBlog()
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  });
});
// Tüm Media
router.get("/allmedia", (req, res, next) => {

  Admin.AllMedia()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});
// Tüm Yorumlar
router.get("/allcomments", (req, res, next) => {
  Admin.AllComments()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});


router.get("/hesapla", (req, res, next) => {
  Admin.Hesapla().then(data=>{
    res.json(data)
  }).catch(err=>{
    res.json(err)
  })
});
module.exports = router;
