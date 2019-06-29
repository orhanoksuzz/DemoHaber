const Comments = require("../../models/Comments");
const CommentsActions = require("../../models/CommentsActions");
const { Record } = require("immutable");
const AllCommentsArrays = async commentArray => {
  return new Promise(async (resolve, reject) => {
    try {
      let array = [];
      for (const key in commentArray) {
        if (commentArray.hasOwnProperty(key)) {
          const element = commentArray[key];

          array.push(element.dataValues);
        }
      }
      resolve({ status: true, data: array });
    } catch (error) {
      reject({ status: false, data: "Array Oluşturulamadı" });
    }
  });
};
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
      const commentData = {
        userId,
        mediaId,
        mediaType,
        comments
      };
      const commentAdd = await Comments.create(commentData);

      resolve({ status: true, data: commentAdd.dataValue });
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
    try {
      const commentActionData = {
        userId,
        commentId,
        actionType
      };
      const CommentsActionsAdd = await CommentsActions.create(
        commentActionData
      );
      const save = await updateComments(commentId,actionType);
      if(save.status){
        resolve({
          status: true,
          message: "Başarı ile gerçekleştirildi",
          data: CommentsActionsAdd.dataValue
        });
      }  
    
    } catch (error) {
      reject({ status: false, message: "Hata Oluştu", data: error });
    }
  });
};
const updateComments = async (commentId, actionType) => {
  actionType = parseInt(actionType);
  return new Promise(async (resolve, reject) => {
    try {
      const search = await Comments.findOne({
        where: {
          id: commentId
        }
      });
     
      if (search) {
        const {
          id,
          userId,
          upCount,
          downCount,
          reportCount      
        } = search.dataValues;
        const commentData = {
          upCount: actionType === 0 ? upCount + 1 : upCount,
          downCount: actionType === 1 ? downCount + 1 : downCount,
          reportCount: actionType === 2 ? reportCount + 1 : reportCount,      
          updatedTime: new Date()
        };

        const result = await Comments.update(commentData, {
          where: {
            id: id,
            userId: userId
          }
        });

        resolve({ status: true, data: result });
      } else {
        reject({ status: false, data: err });
      }
    } catch (err) {
      reject({ status: false, data: err });
    }
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
const getComment = async (commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
    
      const result = await Comments.findOne({
        where: {
          id: commentId,
       
        }
      });

      if (result) {
        resolve({ status: true, data: result.dataValues });
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
      let result = await Comments.findAll({
        where: { mediaId: mediaId, mediaType: mediaType }
      });
      result = await AllCommentsArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
      
        resolve({ status: true, data: result });
      } else {
        resolve({
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
const getMemberComments = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await Comments.findAll({
        where: { userId: userId }
      });
      result = await AllCommentsArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({
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
const getMemberCommentAction = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await CommentsActions.findAll({
        where: { userId: userId }
      });
      result = await AllCommentsArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({
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
const getCommentAction = async (actionType, commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await CommentsActions.findAll({
        where: { commentId: commentId, actionType: actionType }
      });
      result = await AllCommentsArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({
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
const AllComments = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await Comments.findAll({});
      result = await AllCommentsArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Kayıt Bulunamadı" });
      }
    } catch (error) {
      reject({ status: false, data: error });
    }
  });
};
const AllCommetsAction = async commentId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await CommentsActions.findAll({
        where: {
          commentId: commentId
        }
      });
      result = await AllCommentsArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Kayıt Bulunamadı" });
      }
    } catch (error) {
      reject({ status: false, data: error });
    }
  });
};
const AllCommetsActions = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await CommentsActions.findAll({
        where: {
          userId: userId
        }
      });
      result = await AllCommentsArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Yoruma  ait etkileşim bulunamadı" });
      }
    } catch (error) {
      reject({ status: false, data: error });
    }
  });
};
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
