const Media = require("../../models/Media");
const MediaActions = require("../../models/MediaActions");
const { addComment } = require("../../functions/commentsFunctions");
const AllMediaArrays = async mediaArray => {
 
  return new Promise(async (resolve, reject) => {
    try {
      let array = [];
      for (const key in mediaArray) {
        if (mediaArray.hasOwnProperty(key)) {
          const element = mediaArray[key];
         
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
      const mediaData = {
        userId,
        mediaType,
        mediaDetails,
        isFake
      };
  
      const result = await Media.create(mediaData);
      resolve({ status: true, data: result.dataValues });
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
      const mediaActionData = {
        userId: userId,
        mediaId: mediaId,
        actionType: actionType
      };
      if (actionType != 5) {
        const mediaActionSearch = await MediaActions.findOne({
          where: {
            userId: userId,
            mediaId: mediaId
          }
        });
        if (!mediaActionSearch) {
          const result = await MediaActions.create(mediaActionData);
          const save = await updateMedia(mediaId,actionType);
          if(save.status){
            resolve({ status: true, data: result.dataValues });
          }
        
        } else {
          const result = await MediaActions.update(mediaActionData, {
            where: {
              id: mediaActionSearch.dataValues.id,
              mediaId: mediaId
            }
          });
          const save = await updateMedia(mediaId,actionType);
          if(save.status){
            resolve({ status: true, data: result.dataValues });
          }
         
        }
      } else {
        const result = await MediaActions.create(mediaActionData);
        resolve({ status: true, data: result.dataValues });
      }
    } catch (err) {

      reject({ status: false, data: err });
    }
  });
};
const updateMedia = async (mediaId, actionType) => {
  actionType = parseInt(actionType);
  return new Promise(async (resolve, reject) => {
    try {
      const search = await Media.findOne({
        where: {
          id: mediaId
        }
      });
     
      if (search) {
        const {
          id,
          userId,
          upCount,
          downCount,
          reportCount,
          saveCount,
          lightCount
        } = search.dataValues;
        const mediaData = {
          upCount: actionType === 0 ? upCount + 1 : upCount,
          downCount: actionType === 1 ? downCount + 1 : downCount,
          reportCount: actionType === 2 ? reportCount + 1 : reportCount,
          lightCount: actionType === 3 ? lightCount + 1 : lightCount,
          saveCount: actionType === 4 ? saveCount + 1 : saveCount,      
          updatedTime: new Date()
        };

        const result = await Media.update(mediaData, {
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
          resolve(commentpromise);
        }
      } else {
        resolve(mediaaction);
      }
    } catch (error) {

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
   
      const result = await Media.findOne({
        where:{
          id:mediaId
        }
      })
      if (result) {
        resolve({ status: true, data: result.dataValues });
      } else {
        resolve({
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
      let medias = await Media.findAll({
        where: {
          userId: userId
        }
      });
      medias = await AllMediaArrays(medias);
      medias = medias.status ? medias.data : undefined;
      if (medias) {
        resolve({ status: true, data: medias });
      } else {
        resolve({ status: false, data: "Data Bulunamadı" });
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
 *  Get User  Media  Action
 * @param {
 *     userId: ObjectId,
 * } params
 */
const getMemberMediaAction = async userId => {
  return new Promise(async (resolve, reject) => {

    try {
      let result = await MediaActions.findAll({
        where: {
          userId: userId
        }
      });
      result = await AllMediaArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Data Bulunamadı" });
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
      let result = await MediaActions.findAll({
        where:{ mediaId:mediaId, actionType:actionType }
      });
      result = await AllMediaArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Data Bulunamadı" });
      }
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};
const AllMedia = async () => {
  return new Promise(async (resolve, reject) => {
   
    try {
      let result = await Media.findAll({ });
      result = await AllMediaArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Data Bulunamadı" });
      }
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};
const AllMediaAction = async mediaId => {
  return new Promise(async (resolve, reject) => {
   
    try {
      let result = await MediaActions.findAll({where:{mediaId:mediaId} });
      result = await AllMediaArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Data Bulunamadı" });
      }
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
  });
};
const AllMediaActions = async userId => {
  return new Promise(async (resolve, reject) => {

    try {
      let result = await MediaActions.findAll({where:{userId:userId} });
      result = await AllMediaArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Data Bulunamadı" });
      }
    } catch (err) {
      reject({
        status: false,
        data: err
      });
    }
    
  });
};
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
