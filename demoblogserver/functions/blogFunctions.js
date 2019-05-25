const Blog = require('../models/Blog');
const BlogActions = require('../models/BlogActions');
const { addComment } = require("../functions/commentsFunctions");
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
    try {
      if(actionType!=4){
        const blogActionAdd = await BlogActions.findOneAndUpdate(
          {
            userId,
            mediaId:blogId
          }, // find a document with that filter
          {
            userId,
            mediaId:blogId,
            actionType
          }, // document to insert when nothing was found
          { upsert: true, new: true, runValidators: true });
          resolve({ status: true, data: blogActionAdd });
      }else{
        const blogActionAdd = await new BlogActions({
          userId,
          mediaId:blogId,
          actionType
        });
        const blogActionPromise = await blogActionAdd.save();
  
        resolve({ status: true, data: blogActionPromise });
      }
    
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
};
const addBlogComment= async (userId, blogId, comments) => {
  return new Promise(async (resolve, reject) => {
   try {
    const blogactionadd = await addBlogAction(userId,blogId,4);
    console.log('blogactionadd',blogactionadd);
    if(blogactionadd.status){
      const commentpromise = await addComment(userId, blogId, 1, comments);

      if (commentpromise.status) {
        resolve(commentpromise);
      } else {
        reject(commentpromise);
      }
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
      resolve({status:true,data:result});
     
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
  console.log('getblogaction',mediaId)
  console.log('getblogaction',actionType)
  return new Promise(async (resolve, reject) => {
    try {      
      const result = await BlogActions.find({mediaId,actionType});
     console.log('result',result)
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
const AllBlog = async () =>{
  return new Promise(async(resolve,reject)=>{
    try {
      const result = await Blog.find({  });
      resolve({ status: true, data: result });
    
    } catch (error) {
      reject({status:false,data:error})
    } 
  })
}
const AllBlogAction = async (mediaId) =>{
  return new Promise(async(resolve,reject)=>{
    try {
      const result = await BlogActions.find({ mediaId });
      resolve({ status: true, data: result });
    
    } catch (error) {
      reject({status:false,data:error})
    } 
  })
}
const AllBlogActions = async (userId) =>{
  
  return new Promise(async(resolve,reject)=>{
    try {
      let allblogs=[];
      const user = await getMemberBlog(userId);
  
      const bloglist = user.data;
      for (const key in bloglist) {
        if (bloglist.hasOwnProperty(key)) {
          let blog={};
          blog.mediaId = bloglist[key]._id;         
          const result = await AllBlogAction(blog.mediaId);
          blog.data = result.data;
          allblogs.push(blog);
        }
      }    
      resolve({ status: true, data: allblogs });    
    } catch (error) {
      console.log('allmedia',error);
      reject({status:false,data:error})
    } 
  })
}
module.exports={
    addBlog,
    addBlogAction,
    addBlogComment,
    getBlog,
    getBlogAction,
    getMemberBlog,
    getMemberBlogAction,
    AllBlog,
    AllBlogActions
    
}