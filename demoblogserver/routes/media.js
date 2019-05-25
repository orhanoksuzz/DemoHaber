const express = require("express");
const router = express.Router();
const Media = require("../functions/index");
/*
const events = require('events');
const eventEmitter = events.EventEmitter;
const emitter = new eventEmitter();

const Hesapla = async  (blogID) => {
    const upPoint=0.01,
          downPoint=-0.1,
          lightPoint=1,
          reportPoint=-5;
          
    let resultData;
    try {
        const promise = await Blog.findById(blogID);
        const {upCount,downCount,lightCount,reportCount,fake} = promise;

        const hesapla = (upCount*upPoint) + 
                        (downCount *downPoint ) + 
                        (lightCount*lightPoint) + 
                        (reportCount*reportPoint);
    
        resultData={
            status:true,
            message:hesapla
        }
    } catch (error) {
        resultData={
            status:false,
            message:error
        }
    }   
    return resultData
}
emitter.on('newBlogActions', async (blogID) => {
  console.log('newBlogActions',blogID);
  
});
*/
/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("Media Api EndPoint");
});
/* Yeni Media Ekleme */
router.post("/newmedia", (req, res, next) => {
  const { userId, mediaType, mediaTitle,mediaUrl, isFake } = req.body;
  const mediaDetails = {
     mediaTitle,
     mediaUrl
  }
  const params = {
    userId,
    mediaType:parseInt(mediaType),
    mediaDetails,
    isFake:isFake != '' ? isFake : undefined
  };
  console.log('params',params)
  Media.addMedia(params)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
/* Media detaylarını öğrenme */
router.get("/viewmedia/:mediaId", (req, res, next) => {
  Media.getMedia(req.params.mediaId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

/* Media  için Action  */
router.put("/mediaaction/:actionType/:userId/:mediaId", (req, res, next) => {
  const { userId, mediaId, actionType } = req.params;
  if (actionType < 0 && actionType > 6)
    res.json({ status: false, data: "Action Type Hatalı" });
  Media.addMediaAction(userId, mediaId, actionType)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

/* Media Action yapanları Listeleme */
router.get("/viewmediaaction/:actionType/:mediaId", (req, res, next) => {
  const { mediaId, actionType } = req.params;
  if (actionType < 0 && actionType > 5)
    res.json({ status: false, data: "Action Type Hatalı" });
  Media.getMediaAction(mediaId, actionType)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

/* Media için comment Atma */
router.post("/media/comment", (req, res, next) => {
  const { userId, mediaId, comment } = req.body;
  console.log('Comment',req.body);
  Media.addMediaComment(userId, mediaId, comment)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});
/* Media Comments yapanları Listeleme */
router.get("/viewmediacomment/:mediaId", (req, res, next) => {
  Media.getMediaAction(req.params.mediaId, 5)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
