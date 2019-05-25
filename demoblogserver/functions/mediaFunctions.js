const Media = require("../models/Media");
const MediaActions = require("../models/MediaActions");
const { addComment } = require("../functions/commentsFunctions");
/**
 *  Add Media
 * @param {
 *    userId:ObjectId,
 *    mediaType: Number  0 || 1 || 2
 *    mediaDetails: {mediaTitle,MediaUrl},
 *    isFake: Boolen
 * } params
 */
const addMedia = async params => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId, mediaType, mediaDetails, isFake } = params;
      const mediaadd = await new Media({
        userId,
        mediaType,
        mediaDetails,
        isFake
      });
      const mediaPromise = await mediaadd.save();
      resolve({ status: true, data: mediaPromise });
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
};
/**
 *  Add Media Actions
 * @param {
 *    userId:ObjectId,
 *    mediaId: ObjectId,
 *    actionType:Number 0 || 1 || 2 || 3 || 4 || 5
 * } params
 */
const addMediaAction = async (userId, mediaId, actionType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(actionType!=5){
        const mediaActionAdd = await MediaActions.findOneAndUpdate(
          {
            userId,
            mediaId
          }, // find a document with that filter
          {
            userId,
            mediaId,
            actionType
          }, // document to insert when nothing was found
          { upsert: true, new: true, runValidators: true });
          resolve({ status: true, data: mediaActionAdd });
      }else{
        const mediaActionAdd = await new MediaActions({
          userId,
          mediaId,
          actionType
        });
        const mediaActionPromise = await mediaActionAdd.save();
  
        resolve({ status: true, data: mediaActionPromise });
      }
    
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
   
};
/**
 *  Add Media Comments
 * @param {
 *    userId:ObjectId,
 *    mediaId: ObjectId,
 *    comments:String
 * } params
 */
const addMediaComment = async (userId, mediaId, comments) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mediaaction = await addMediaAction(userId, mediaId, 5);

      if (mediaaction.status) {
        const commentpromise = await addComment(userId, mediaId, 0, comments);

        if (commentpromise.status) {
          resolve(commentpromise);
        } else {
          reject(commentpromise);
        }
      } else {
     
        reject(mediaaction);
      }
    } catch (error) {
      console.log("errormediacomment", error);
      reject({ status: false, data: error });
    }
  });
};
/**
 *  Get Media
 * @param {
 *     mediaId: ObjectId,
 * } params
 */
const getMedia = async mediaId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Media.findById(mediaId);

      if (result) {
        resolve({ status: true, data: result });
      } else {
        reject({
          status: false,
          data: "Media Kaydı Bulunamadı"
        });
      }
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};
/**
 *  Get User Media
 * @param {
 *     userId: ObjectId,
 * } params
 */
const getMemberMedia = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Media.find({ userId });
      resolve({ status: true, data: result });
    
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};
/**
 *  Get User  Media  Action
 * @param {
 *     userId: ObjectId,
 * } params
 */
const getMemberMediaAction = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await MediaActions.find({ userId });

      if (result) {
        resolve({ status: true, data: result });
      } else {
        reject({
          status: false,
          data: "Kullanıcıya Ait Media Actions Kaydı Bulunamadı"
        });
      }
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};
/**
 *  Get   Media  Action
 * @param {
 *     mediaId: ObjectId,
 *     actionType:Number 0 || 1 || 2 || 3 || 4 || 5
 * } params
 */
const getMediaAction = async (mediaId, actionType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await MediaActions.find({ mediaId, actionType });

      if (result) {
        resolve({ status: true, data: result });
      } else {
        reject({
          status: false,
          data: "Media Actions Kaydı Bulunamadı"
        });
      }
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};
const AllMedia = async () =>{
  return new Promise(async(resolve,reject)=>{
    try {
      const result = await Media.find({  });
      resolve({ status: true, data: result });
    
    } catch (error) {
      reject({status:false,data:error})
    } 
  })
}
const AllMediaAction = async (mediaId) =>{
  return new Promise(async(resolve,reject)=>{
    try {
      const result = await MediaActions.find({ mediaId });
      resolve({ status: true, data: result });
    
    } catch (error) {
      reject({status:false,data:error})
    } 
  })
}
const AllMediaActions = async (userId) =>{
  
  return new Promise(async(resolve,reject)=>{
    try {
      let allmedias=[];
      const user = await getMemberMedia(userId);
      
      const mediaList = user.data;
      for (const key in mediaList) {
        if (mediaList.hasOwnProperty(key)) {
          let media={};
          media.mediaId = mediaList[key]._id;      
          media.isFake =   mediaList[key].isFake;  
          const result = await AllMediaAction(media.mediaId);
          media.data = result.data;
          allmedias.push(media);
        }
      }    
      resolve({ status: true, data: allmedias });    
    } catch (error) {
      console.log('allmedia',error);
      reject({status:false,data:error})
    } 
  })
}
module.exports = {
  addMedia,
  addMediaAction,
  addMediaComment,
  getMedia,
  getMemberMedia,
  getMemberMediaAction,
  getMediaAction,
  AllMedia,
  AllMediaActions
};
