const Blog = require('../models/Blog');
const BlogActions = require('../models/BlogActions');
const Comments = require('../models/Comments');
/**
 *  Add Blog Message
 * @param {
 *   userId:ObjectID,
 *   blog:String
 * } params 
 */
const  addBlog = async  (userId,blog) => {
  return new Promise(async (resolve,reject)=>{
    try {
        const blogadd = await new Blog({
          userId,
          blog     
        });
        const blogPromise = await blogadd.save();
        resolve( {status:true,data:blogPromise});     
    }catch (err) {
        reject( {status:false,data:err});
    }
  })
  
};
const addBlogAction = async (userId, blogId, actionType) => {
  return new Promise(async (resolve, reject) => {
    BlogAction.findOneAndUpdate(
      {
        userId,
        blogId
      }, // find a document with that filter
      {
        userId,
        blogId,
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
const addBlogComment= async (userId, blogId, comments) => {
  return new Promise(async (resolve, reject) => {
   try {
    const blogaction = await addBlogAction(userId,blogId,4);
    if(blogaction.status){
      const CommentPromise = await new Comments({
        userId,
        mediaType:1,
        mediaId:blogId,
        comments
      });
      resolve( {status:true,data:CommentPromise});    
    }else{
      reject(blogaction)
    }
    
   } catch (error) {
     reject({status:false,data:error})
   }

  });
};
const getBlog = async blogId =>{
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Blog.findById(blogId);
     
      if (result) {       
        resolve({status:true,data:result});
      } else {
        reject({
          status: false,
          data: "Blog Kaydı Bulunamadı"
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
const getMemberBlog = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Blog.find({userId});
     
      if (result) {       
        resolve({status:true,data:result});
      } else {
        reject({
          status: false,
          data: "Blog Kaydı Bulunamadı"
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
const getMemberBlogAction = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await BlogActions.find({userId});
     
      if (result) {       
        resolve({status:true,data:result});
      } else {
        reject({
          status: false,
          data: "Kullanıcıya Ait Blog Actions Kaydı Bulunamadı"
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
const getBlogAction = async (mediaId,actionType) => {
  return new Promise(async (resolve, reject) => {
    try {      
      const result = await BlogActions.find({mediaId,actionType});
     
      if (result) {       
        resolve({status:true,data:result});
      } else {
        reject({
          status: false,
          data: "Media Blog Actions Kaydı Bulunamadı"
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
    addBlog,
    addBlogAction,
    addBlogComment,
    getBlog,
    getBlogAction,
    getMemberBlog,
    getMemberBlogAction,
    
}