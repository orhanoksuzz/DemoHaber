const Comments = require('../models/Comments');
const CommentsActions = require('../models/CommentsActions');
/**
 *  Add Comment 
 * @param {
 *    userId: ObjectId,
 *    mediaType: Number   0 || 1,
 *    mediaId: ObjectId,
 *    comments: String,
 * } params 
 */
const  addComment = async  (userId,mediaId,mediaType,comments) => {
  return new Promise(async (resolve, reject)=>{
    try {
        const addComment = await new Comments({
          userId,
          mediaId,
          mediaType,
          comments     
        });
        const commentPromise = await addComment.save();
        resolve( {status:true,data:commentPromise});     
    }catch (err) {
        reject( {status:false,data:err});
    }
  })
  
};
/**
 *  Add CommentAction 
 * @param {
  *    userId: ObjectId,
  *    mediaType: Number   0 || 1,
  *    mediaId: ObjectId,
  *    actionType: Number 0 || 1 || 2,
  * } params 
  */
const addCommentAction = async (userId,mediaId,mediaType, actionType) => {
  return new Promise(async (resolve, reject) => {
    CommentsActions.findOneAndUpdate(
      {
        userId,
        mediaId
      }, // find a document with that filter
      {
        userId,
        mediaId,
        mediaType,
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
 *  Get Comment
 * @param {
  *   
  *    mediaType: Number   0 || 1,
  *    mediaId: ObjectId,
  *   
  * } params 
  */
const getComments = async (mediaId,mediaType) =>{
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Comments.findOne({mediaId,mediaType});
     
      if (result) {       
        resolve({status:true,data:result});
      } else {
        reject({
          status: false,
          data: "Yorum Kaydı Bulunamadı"
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
 *  Get Comment
 * @param { 
  *    userId: ObjectId, 
  *    mediaType:Number 0 || 1
  * } params 
  */
const getMemberComments = async (userId,mediaType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Comments.find({userId,mediaType});
     
      if (result) {       
        resolve({status:true,data:result});
      } else {
        reject({
          status: false,
          data: "Yorum Kaydı Bulunamadı"
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
 *  Get Comment Action
 * @param {    
  *    mediaType: Number   0 || 1,
  *    mediaId: ObjectId,
  *    actionType: Number 0 || 1 || 2 
  * } params 
  */
const getCommentAction = async (mediaId,mediaType,actionType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CommentsActions.find({mediaId,mediaType,actionType});
     
      if (result) {       
        resolve({status:true,data:result});
      } else {
        reject({
          status: false,
          data: "Kullanıcıya Ait Comment Actions Kaydı Bulunamadı"
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
  addComment,
  addCommentAction,
  getComments,
  getMemberComments,
  getCommentAction
    
}