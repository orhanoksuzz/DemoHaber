const {
  Register,
  Login,
  LostPassword,
  MemberView,
  AllMember
} = require("./memberFunction");

const {
  addBlog,
  addBlogAction,
  addBlogComment,
  getBlog,
  getBlogAction,
  getMemberBlog,
  getMemberBlogAction,
  AllBlog,
  AllBlogActions
} = require("./blogFunctions");
const {
  addMedia,
  addMediaAction,
  addMediaComment,
  getMedia,
  getMemberMedia,
  getMemberMediaAction,
  getMediaAction,
  AllMedia,
  AllMediaActions
} = require("./mediaFunctions");
const {
  addComment,
  addCommentAction,
  getComment,
  getComments,
  getMemberComments,
  getCommentAction,
  getMemberCommentAction,
  AllComments,
  AllCommetsActions
} = require("./commentsFunctions");
const MemberActions = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      let memberMediaAction = {
        up: 0,
        down: 0,
        report: 0,
        light: 0,
        save: 0,
        comments: 0
      };
      let blogMediaAction = {
        up: 0,
        down: 0,
        report: 0,
        save: 0,
        comments: 0
      };
      let commentMediaAction = {
        up: 0,
        down: 0,
        report: 0
      };
      const mediaAction = await getMemberMediaAction(userId).data,
        blogAction = await getMemberBlogAction(userId).data,
        commentAction = await getMemberCommentAction(userId).data;
      
      for (const key in mediaAction) {
        if (mediaAction.hasOwnProperty(key)) {
          const actionType = mediaAction[key].actionType;
          switch (actionType) {
            case 0:
              memberMediaAction.up += 1;
              break;
            case 1:
              memberMediaAction.down += 1;
              break;
            case 2:
              memberMediaAction.report += 1;
              break;
            case 3:
              memberMediaAction.light += 1;
              break;
            case 4:
              memberMediaAction.save += 1;
              break;
            case 5:
              memberMediaAction.comments += 1;
              break;
            default:
              break;
          }
        }
      }
      for (const key in blogAction) {
        if (blogAction.hasOwnProperty(key)) {
          const actionType = blogAction[key].actionType;
          switch (actionType) {
            case 0:
              blogMediaAction.up += 1;
              break;
            case 1:
              blogMediaAction.down += 1;
              break;
            case 2:
              blogMediaAction.report += 1;
              break;
            case 3:
              blogMediaAction.save += 1;
              break;
            case 4:
              blogMediaAction.comments += 1;
              break;
            default:
              break;
          }
        }
      }
   
      for (const key in commentAction) {
        if (commentAction.hasOwnProperty(key)) {
          
          const actionType = commentAction[key].actionType;
         
          switch (actionType) {
            case 0:
              commentMediaAction.up += 1;
              break;
            case 1:
              commentMediaAction.down += 1;
              break;
            case 2:
              commentMediaAction.report += 1;
              break;

            default:
              break;
          }
        }
      }
      const memberActionCount = {
        media: memberMediaAction,
        blog: blogMediaAction,
        comment: commentMediaAction
      };
      resolve({ status: true, data: memberActionCount });
    } catch (error) {
      reject({ status: false, data: error });
    }
  });
};
const setMediaPoint = async mediaData => {

  return new Promise(async (resolve, reject) => {
    try {
      let hesapla = mediaData.length * 0.005;
      for (const key in mediaData) {
        if (mediaData.hasOwnProperty(key)) {
          const element = mediaData[key];
        
          let mediaFakePoint = element.isfake ? -1 : 0;
          let upPoint = element.upCount * 0.001,
              downPoint = -(element.downCount * 0.001),
              lightPoint = element.isfake ? -( element.lightCount* 0.003) : element.lightCount * 0.003,
              savePoint = element.saveCount * 0.002,
              reportPoint =-(element.reportCount * 0.001);
          hesapla += upPoint + downPoint + lightPoint + savePoint + reportPoint+ mediaFakePoint;   
          
        
        }
      }
     
      resolve(hesapla);
    } catch (error) {
  
      reject({ error: "Media Puanı Hesaplanamadı" });
    }
  });
};
const setBlogPoint = async blogData => {
  return new Promise(async (resolve, reject) => {
    try {
     
      let hesapla = blogData.length * 0.005;
   
      for (const key in blogData) {
        if (blogData.hasOwnProperty(key)) {
          const element = blogData[key];
   
          let upPoint = element.upCount * 0.001,
          downPoint = -(element.downCount * 0.001),         
          savePoint = element.saveCount * 0.002,
          reportPoint =-(element.reportCount * 0.002);
          hesapla += upPoint + downPoint  + savePoint + reportPoint;   
        }
      } 
     
      resolve(hesapla);
    } catch (error) {
      reject({ error: "Blog puanı hesaplanamadı" });
    }
  });
};
const setCommentsActionsPoint = async commentsData => {
  return new Promise(async (resolve, reject) => {
    try {
      let hesapla = 0;
      for (const key in commentsData) {
        if (commentsData.hasOwnProperty(key)) {
          const element = commentsData[key];
          console.log('commentselement',element);
          let upPoint = element.upCount * 0.002,
          downPoint = -(element.downCount * 0.002),     
          reportPoint =-(element.reportCount * 0.002);
          hesapla += upPoint + downPoint   + reportPoint;   
       
        }
      }

      resolve(hesapla);
    } catch (error) {
      reject({ error: "CommentsAction puanı hesaplanamadı" });
    }
  });
};
const setActionsPoint = async actionsData => {
  
  return new Promise(async (resolve, reject) => {
    try {
      let hesapla = 0;
      for (const key in actionsData) {
        if (actionsData.hasOwnProperty(key)) {
          const element = actionsData[key];
          console.log('actionselement',element);
          let upPoint = element.up * 0.002,
          downPoint = -(element.down * 0.002);  
        
          hesapla += upPoint + downPoint   ; 
         
        }
      }

      resolve(hesapla);
    } catch (error) {
      reject({ error: "Actions puanı hesaplanamadı" });
    }
  });
};
const getHesapla = async userData => {
 console.log('userData',userData);
  return new Promise(async (resolve, reject) => {
    try {
      let mediaCount = await setMediaPoint(userData.media); // paylaştığı medialar
      
      let blogCount = await setBlogPoint(userData.blog); // paylaştığı blog içerikleri
      let commentCount = await setCommentsActionsPoint(userData.comment); // yaptığı yorumlar
      let actionsCount = await setActionsPoint(userData.actions); // yaptığı etkileşimler
      let points = mediaCount + blogCount + commentCount + actionsCount;

      resolve(points);
    } catch (error) {
      reject({ message: "Puan Hesaplanamadı", error });
    }
  });
};

const Hesapla = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let hesaplama = [];
      const users = (await AllMember()).data;
    
      for (const key in users) {
      

        if (users.hasOwnProperty(key)) {
          let member = {};
          member.userId = users[key].userId;

          const memberallmedia = await getMemberMedia(member.userId);
         
          const memberallblog = await getMemberBlog(member.userId);
        
          const memberallcomments = await getMemberComments(member.userId);
    
          const memberallactions = await MemberActions(member.userId);
      
          const userData = {
            media: memberallmedia.data,
            blog: memberallblog.data,
            comment: memberallcomments.data,
            actions: memberallactions.data
          };
          
         member.points = await getHesapla(userData);
          hesaplama.push(member);
        }
      }
      resolve({ status: true, data: hesaplama });
    } catch (error) {
      console.log('error',error);
      reject({ status: false, data: error });
    }
  });
};

module.exports = {
  Login,
  Register,
  LostPassword,
  MemberView,
  AllMember, // Member  Functions
  addBlog,
  addBlogAction,
  addBlogComment,
  getBlog,
  getBlogAction,
  getMemberBlog,
  getMemberBlogAction,
  AllBlog, // Blog Functions
  addMedia,
  addMediaAction,
  addMediaComment,
  getMedia,
  getMemberMedia,
  getMemberMediaAction,
  getMediaAction,
  AllMedia, // Media Functions
  addComment,
  addCommentAction,
  getComment,
  getComments,
  getMemberComments,
  getCommentAction,
  AllComments, // Comment Functions
  Hesapla
};
