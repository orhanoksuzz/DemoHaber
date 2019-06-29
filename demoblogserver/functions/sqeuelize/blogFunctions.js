const Blog = require("../../models/Blog");
const BlogActions = require("../../models/BlogActions");
const { addComment } = require("../../functions/commentsFunctions");
const AllBlogArrays = async blogArray => {
  return new Promise(async (resolve, reject) => {
    try {
      let array = [];
      for (const key in blogArray) {
        if (blogArray.hasOwnProperty(key)) {
          const element = blogArray[key];

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
 *  Add Blog Message
 * @param {
 *   userId:ObjectID,
 *   blog:String
 * } params
 */
const addBlog = async (userId, blog) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogData = {
        userId: userId,
        blog: blog
      };

      Blog.create(blogData)
        .then(blog => {
          resolve({ status: true, data: blog.dataValues });
        })
        .catch(err => {
          reject({ status: false, data: err });
        });
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
};
const addBlogAction = async (userId, blogId, actionType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogActionData = {
        userId: userId,
        mediaId: blogId,
        actionType: actionType
      };

      if (actionType != 4) {
        const blogactions = await BlogActions.findOne({
          where: {
            userId: userId,
            mediaId: blogId
          }
        });
        if (!blogactions) {
          const actions = await BlogActions.create(blogActionData);
          const save = await updateBlog(blogId, actionType);
          if (save.status) {
            resolve({ status: true, data: actions.dataValues });
          }
        } else {
          const actions = await BlogActions.update(blogActionData, {
            where: {
              id: blogactions.dataValues.id,
              mediaId: blogId
            }
          });
          const save = await updateBlog(blogId, actionType);
          if (save.status) {
            resolve({ status: true, data: actions.dataValues });
          }
        }
      } else {
        const actions = await BlogActions.create(blogActionData);
        resolve({ status: true, data: actions.dataValues });
      }
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
};
const updateBlog = async (blogId, actionType) => {
  actionType = parseInt(actionType);
  return new Promise(async (resolve, reject) => {
    try {
      const search = await Blog.findOne({
        where: {
          id: blogId
        }
      });
      console.log("search", search);
      if (search) {
        const {
          id,
          userId,
          upCount,
          downCount,
          reportCount,
          saveCount
        } = search.dataValues;
        const blogData = {
          upCount: actionType === 0 ? upCount + 1 : upCount,
          downCount: actionType === 1 ? downCount + 1 : downCount,
          reportCount: actionType === 2 ? reportCount + 1 : reportCount,
          saveCount: actionType === 3 ? saveCount + 1 : saveCount,
          updatedTime: new Date()
        };

        const result = await Blog.update(blogData, {
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
const addBlogComment = async (userId, blogId, comments) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogactionadd = await addBlogAction(userId, blogId, 4);
      console.log("blogactionadd", blogactionadd);
      if (blogactionadd.status) {
        const commentpromise = await addComment(userId, blogId, 1, comments);

        if (commentpromise.status) {
          resolve(commentpromise);
        } else {
          resolve(commentpromise);
        }
      } else {
        resolve(blogaction);
      }
    } catch (error) {
      console.log("error", error);
      reject({ status: false, data: error });
    }
  });
};
const getBlog = async blogId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Blog.findOne({
        where: {
          id: blogId
        }
      });

      if (result) {
        resolve({ status: true, data: result.dataValues });
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
};
const getMemberBlog = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogs = await Blog.findAll({
        where: {
          userId: userId
        }
      });
      blogs = await AllBlogArrays(blogs);
      blogs = blogs.status ? blogs.data : undefined;
      if (blogs) {
        resolve({ status: true, data: blogs });
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
const getMemberBlogAction = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogsAction = await BlogActions.findAll({
        where: {
          userId: userId
        }
      });
      blogsAction = await AllBlogArrays(blogsAction);
      blogsAction = blogsAction.status ? blogsAction.data : undefined;
      if (blogsAction) {
        resolve({ status: true, data: blogsAction });
      } else {
        resolve({
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
};
const getBlogAction = async (mediaId, actionType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await BlogActions.findAll({
        where: {
          mediaId: mediaId,
          actionType: actionType
        }
      });

      result = await AllBlogArrays(result);
      result = result.status ? result.data : undefined;

      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({
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
};
const AllBlog = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogs = await Blog.findAll({});
      blogs = await AllBlogArrays(blogs);
      blogs = blogs.status ? blogs.data : undefined;
      if (blogs) {
        resolve({ status: true, data: blogs });
      } else {
        resolve({ status: false, data: "Blog Kaydı Bulunamadı" });
      }
    } catch (error) {
      reject({ status: false, data: error });
    }
  });
};
const AllBlogAction = async mediaId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await BlogActions.findAll({
        where: {
          mediaId: mediaId
        }
      });
      result = await AllBlogArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Bloga  ait etkileşim bulunamadı" });
      }
    } catch (error) {
      reject({ status: false, data: error });
    }
  });
};
const AllBlogActions = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await BlogActions.findAll({
        where: {
          userId: userId
        }
      });
      result = await AllBlogArrays(result);
      result = result.status ? result.data : undefined;
      if (result) {
        resolve({ status: true, data: result });
      } else {
        resolve({ status: false, data: "Bloga  ait etkileşim bulunamadı" });
      }
    } catch (error) {
      console.log("allmedia", error);
      reject({ status: false, data: error });
    }
  });
};
module.exports = {
  addBlog,
  addBlogAction,
  addBlogComment,
  getBlog,
  getBlogAction,
  getMemberBlog,
  getMemberBlogAction,
  AllBlog,
  AllBlogActions
};
