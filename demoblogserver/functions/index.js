const {
    Register,
    Login,
    LostPassword,
    MemberView,
    AllMember
} = require('./memberFunction');

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
} =require('./blogFunctions');
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
} =require('./mediaFunctions');
const {
    addComment,
    addCommentAction,
    getComment,
    getComments,
    getMemberComments,
    getCommentAction,
    AllComments,
    AllCommetsActions
} =require('./commentsFunctions');


const Hesapla = async () => {
    return new Promise(async(resolve,reject) => {
        try {
            let hesaplama=[];
            const users =(await AllMember()).data;
            console.log('users',users);
            for (const key in users) {
                console.log('key',users[key].userId);
                
                if (users.hasOwnProperty(key)) {
                    let member = {};
                     member.userId = users[key].userId;
                 
                    const memberallmedia = await AllMediaActions(member.userId);
                    const memberallblog = await AllBlogActions(member.userId);
                    const memberallcomments = await AllCommetsActions(member.userId);
                    member.media = memberallmedia.data;
                    member.blog = memberallblog.data;
                    member.comments = memberallcomments.data;
                    hesaplama.push(member);                   
                }
                
            }
            resolve({status:true,data:hesaplama});
        } catch (error) {
        
            reject({status:false,data:error});
        }
    })
}


module.exports={
    Login,Register,LostPassword,MemberView,AllMember, // Member  Functions
    addBlog,addBlogAction,addBlogComment, getBlog,getBlogAction,getMemberBlog,getMemberBlogAction,AllBlog, // Blog Functions
    addMedia,addMediaAction,addMediaComment,getMedia,getMemberMedia,getMemberMediaAction, getMediaAction,AllMedia, // Media Functions
    addComment,addCommentAction,getComment,getComments,getMemberComments,getCommentAction,AllComments, // Comment Functions
    Hesapla
}