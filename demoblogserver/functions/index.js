const {
    Register,
    Login,
    LostPassword,
    MemberView
} = require('./memberFunction');

const {
    addBlog,
    addBlogAction,
    addBlogComment,
    getBlog,
    getBlogAction,
    getMemberBlog,
    getMemberBlogAction,
} =require('./blogFunctions');
const {
    addMedia,
    addMediaAction,
    addMediaComment,
    getMedia,
    getMemberMedia,
    getMemberMediaAction,
    getMediaAction
} =require('./mediaFunctions');
const {
    addComment,
    addCommentAction,
    getComments,
    getMemberComments,
    getCommentAction
} =require('./commentsFunctions');


module.exports={
    Login,Register,LostPassword,MemberView, // Member  Functions
    addBlog,addBlogAction,addBlogComment, getBlog,getBlogAction,getMemberBlog,getMemberBlogAction, // Blog Functions
    addMedia,addMediaAction,addMediaComment,getMedia,getMemberMedia,getMemberMediaAction, getMediaAction, // Media Functions
    addComment,addCommentAction,getComments,getMemberComments,getCommentAction // Comment Functions
}