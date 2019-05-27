const Comments = require("../models/Comments");
const CommentsActions = require("../models/CommentsActions");
const {Record} = require('immutable');


/**
 *  Add Comment
 * @param {
 *    userId: ObjectId,
 *    mediaType: Number   0 || 1,
 *    mediaId: ObjectId,
 *    comments: String,
 * } params
 */
const addComment = async (userId, mediaId, mediaType, comments) => {
  return new Promise(async (resolve, reject) => {
    try {
      const commetAdd = await new Comments({
        userId,
        mediaId,
        mediaType,
        comments
      });
      const commentPromise = await commetAdd.save();

      resolve({ status: true, data: commentPromise });
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
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
const addCommentAction = async (userId, commentId, actionType) => {
  return new Promise(async (resolve, reject) => {
    CommentsActions.findOneAndUpdate(
      {
        userId,
        commentId
      }, // find a document with that filter
      {
        userId,
        commentId,     
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
 *    commentId: ObjectId,
 *
 * } params
 */
const getComment = async commentId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Comments.findById(commentId);

      if (result) {
        resolve({ status: true, data: result });
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
};
/**
 *  Get Comments
 * @param {
 *
 *    mediaType: Number   0 || 1,
 *    mediaId: ObjectId,
 *
 * } params
 */
const getComments = async (mediaId, mediaType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Comments.findOne({ mediaId, mediaType });

      if (result) {
        resolve({ status: true, data: result });
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
};
/**
 *  Get Comment
 * @param {
 *    userId: ObjectId,
 *    mediaType:Number 0 || 1
 * } params
 */
const getMemberComments = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const result = await Comments.find({ userId });
      resolve({ status: true, data: result });
     
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};
const getMemberCommentAction = async (userId ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CommentsActions.find({      
        userId
      });

      if (result) {
        resolve({ status: true, data: result });
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
};
/**
 *  Get Comment Action
 * @param {
 *    mediaType: Number   0 || 1,
 *    mediaId: ObjectId,
 *    actionType: Number 0 || 1 || 2
 * } params
 */
const getCommentAction = async (actionType,commentId ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CommentsActions.find({      
        commentId,
        actionType
      });

      if (result) {
        resolve({ status: true, data: result });
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
};
const AllComments = async () =>{
  return new Promise(async(resolve,reject)=>{
    try {
      const result = await Comments.find({  });
      resolve({ status: true, data: result });
    
    } catch (error) {
      reject({status:false,data:error})
    } 
  })
}
const AllCommetsAction = async (commentId) =>{
  return new Promise(async(resolve,reject)=>{
    try {
      const result = await CommentsActions.find({ commentId });
      resolve({ status: true, data: result });
    
    } catch (error) {
      reject({status:false,data:error})
    } 
  })
}
const AllCommetsActions = async (userId) =>{
  
  return new Promise(async(resolve,reject)=>{
    try {
      let allcomment=[];
      const user = await getMemberComments(userId);
  
      const commentlist = user.data;
      for (const key in commentlist) {
        if (commentlist.hasOwnProperty(key)) {
          let comment={};
          comment.commentId = commentlist[key]._id;         
          const result = await AllCommetsAction(comment.commentId);
          comment.data = result.data
          allcomment.push(comment);
        
        }
      }    
      resolve({ status: true, data: allcomment });    
    } catch (error) {
      console.log('allmedia',error);
      reject({status:false,data:error})
    } 
  })
}
module.exports = {
  addComment,
  addCommentAction,
  getComment,
  getComments,
  getMemberComments,
  getCommentAction,
  getMemberCommentAction,
  AllComments,
  AllCommetsActions
};
