const express = require("express");
const router = express.Router();
const Member = require('../functions/sqeuelize/index');

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

/*  Kullanıcı Detaylarını Öğrenme */
router.get("/view/:userId", (req, res, next) => {
 Member.MemberView(req.params.userId).then(data=>{
   res.json(data);
 }).catch(err => {
   res.json(err);
 });
});
/*  kullanıcıya ait blog detaylarını öğrenme */

router.get("/viewuserblog/:userId", (req, res, next) => {
  Member.getMemberBlog(req.params.userId).then(data=>{
    res.json(data);
  }).catch(err=>{
    res.json(err)
  })
 
});
/*  kullanıcıya ait Media detaylarını öğrenme */

router.get("/viewusermedia/:userId", (req, res, next) => {
  Member.getMemberMedia(req.params.userId).then(data=>{
    res.json(data);
  }).catch(err=>{
    res.json(err)
  })
 
});


module.exports = router;
