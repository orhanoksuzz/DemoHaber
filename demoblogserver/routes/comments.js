const express = require('express');
const router = express.Router();
const Comment = require("../functions/sqeuelize/index");


router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Comments Page' });
});
/* Yorumları öğrenme */
router.get("/viewcomment/:commentId", (req, res, next) => {
  Comment.getComment(req.params.commentId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
/* Yorumları öğrenme */
router.get("/viewcomments/:mediaId/:mediaType", (req, res, next) => {
  Comment.getComments(req.params.mediaId,req.params.mediaType)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
/* Kullanıcı Yorumlarını öğrenme */
router.get("/viewusercomment/:userId", (req, res, next) => {
  Comment.getMemberComments(req.params.userId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
/* Comment  için Action  */
router.put("/commentaction/:actionType/:userId/:commentId", (req, res, next) => {
  const { userId, commentId, actionType } = req.params;
  if (actionType < 0 && actionType > 3)
    res.json({ status: false, data: "Action Type Hatalı" });
  Comment.addCommentAction(userId, commentId, actionType)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
/*  Yorumların Actionslarını öğrenme */
router.get("/viewcommentaction/:actionType/:commentId/", (req, res, next) => {
  Comment.getCommentAction(req.params.actionType,req.params.commentId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;