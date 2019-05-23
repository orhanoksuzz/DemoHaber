const Media = require('../models/Media');
const MediaActions = require('../models/MediaActions');
const {addComment} = require('../functions/index');
/**
 *  Add Media
 * @param {
 *    userId:ObjectId,
 *    mediaType: Number
 *    mediaDetails: Object,
 *    isFake: Boolen
 * } params 
 */
const  addMedia = async  (params) => {
  return new Promise(async (resolve, reject)=>{
    try {
      const {userId,mediaType,mediaDetails,isFake} = params;
        const mediaadd = await new Media({
          userId,
          mediaType,
          mediaDetails,
          isFake     
        });
        const mediaPromise = await mediaadd.save();
        resolve( {status:true,data:mediaPromise});     
    }catch (err) {
        reject( {status:false,data:err});
    }
  })
  
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
    MediaActions.findOneAndUpdate(
      {
        userId,
        mediaId
      }, // find a document with that filter
      {
        userId,
        mediaId,
        actionType
      }, // document to insert when nothing was found
      { upsert: true, new: true, runValidators: true }, // options
      (err, doc) => {
        // callback
        if (err) {
          const result = { status: false, message: "Hata Oluştu", data: err };
          reject(result);
        } else {
          const result = {
            status: true,
            message: "Başarı ile gerçekleştirildi",
            data: doc
          };
          resolve(result);
        }
      }
    );
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
const addMediaComment= async (userId, mediaId, comments) => {
  return new Promise(async (resolve, reject) => {
   try {
    const mediaaction = await addMediaAction(userId,mediaId,5);
    if(mediaaction.status){
      const CommentPromise = await addComment(userId,mediaId,0,comments);
      if(CommentPromise.status){
        resolve(CommentPromise);    
      }else{
        reject(CommentPromise)
      }
      
    }else{
      reject(mediaaction)
    }
    
   } catch (error) {
     reject({status:false,data:error})
   }

  });
};
/**
 *  Get Media 
 * @param {
  *     mediaId: ObjectId,
  * } params 
  */
const getMedia = async mediaId =>{
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Media.findById(mediaId);
     
      if (result) {       
        resolve({status:true,data:result});
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
}
/**
 *  Get User Media 
 * @param {
  *     userId: ObjectId,
  * } params 
  */
const getMemberMedia = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Media.find({userId});
     
      if (result) {       
        resolve({status:true,data:result});
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
}
/**
 *  Get User  Media  Action
 * @param {
  *     userId: ObjectId,
  * } params 
  */
const getMemberMediaAction = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await MediaActions.find({userId});
     
      if (result) {       
        resolve({status:true,data:result});
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
}
/**
 *  Get   Media  Action
 * @param {
  *     mediaId: ObjectId,
  *     actionType:Number 0 || 1 || 2 || 3 || 4 || 5
  * } params 
  */
const getMediaAction = async (mediaId,actionType) => {
  return new Promise(async (resolve, reject) => {
    try {      
      const result = await MediaActions.find({mediaId,actionType});
     
      if (result) {       
        resolve({status:true,data:result});
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
}


module.exports={
  addMedia,
  addMediaAction,
  addMediaComment,
  getMedia,
  getMemberMedia,
  getMemberMediaAction,
  getMediaAction
    
}