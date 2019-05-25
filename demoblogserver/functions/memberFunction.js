const Member = require("../models/Member");
const MemberDetails = require("../models/MemberDetails");

/**
 * MemberRegister User
 * @param  {
 *    userName:String,
 *    email:String,
 *    password:String
 *   } MemberRegister
 *  @returns  {
 *      status:Boolen,
 *      data:{
 *         _id:ObjectId,
 *         userName:String,
 *         email:String,
 *         password:String
 *      }
 * } MemberRegister
 */
const MemberRegister = async params => {
  try {
    const registerUser = await new Member({
      userName: params.userName,
      email: params.email,
      password: params.password
    });
    const registerPromise = await registerUser.save();
    return { status: true, data: registerPromise };
  } catch (err) {
    return { status: false, data: err };
  }
};

/**
 * MemberDetailsRegister User
 * @param  {
 *    userId:ObjectId,
 *    fullName:String,
 *    pointCount:Number,
 *    mediaCount:Number,
 *    commentCount:Number,
 *    updatedTime:Date
 *   } MemberDetailsRegister
 *  @returns  {
 *      status:Boolen,
 *      data:{
 *         _id:ObjectId,
 *         userId:ObjectId,
 *         fullName:String,
 *         pointCount:Number,
 *         mediaCount:Number,
 *         commentCount:Number,
 *         createdTime:Date,
 *         updatedTime:Date
 *      }
 * } MemberDetailsRegister
 */
const MemberDetailsRegister = async params => {
  try {
    const registerUserDetails = await new MemberDetails({
      userId: params.userId,
      fullName: params.fullName,
      pointCount: params.pointCount,
      mediaCount: params.mediaCount,
      commentCount: params.commentCount,
      updatedTime: params.updatedTime
    });
    const registerPromise = await registerUserDetails.save();
    return { status: true, data: registerPromise };
  } catch (err) {
    return { status: false, data: err };
  }
};
/**
 *
 * @param {
 *  MemberRegister:Object
 *  MemberRegisterDetails:Object
 * } Register
 * @returns {
 *     status:Boolen,
 *     data:{
 *        userId:ObjectId,
 *        userName:String,
 *        email:String,
 *        fullName:String,
 *        mediaCount:Number,
 *        pointCount:Number,
 *        commentCount:Number
 *     }
 * } Register
 */
const Register = async params => {
  const Register = {
    userName: params.userName,
    email: params.email,
    password: params.password
  };

  const DetailsRegister = {
    userId: params.userId,
    fullName: params.fullName,
    pointCount: params.pointCount,
    mediaCount: params.mediaCount,
    commentCount: params.commentCount,
    updatedTime: params.updatedTime
  };

  return new Promise(async (resolve, reject) => {
    try {
      if (typeof params != "object")
        reject({ status: false, data: "Obje Türünde Data Gönderiniz" });
      const registerUser = await MemberRegister(Register);
      if (!registerUser.status)
        reject({ status: registerUser.status, data: registerUser.data });
      DetailsRegister.userId = registerUser.data._id;
      const registerUserDetails = await MemberDetailsRegister(DetailsRegister);
      if (registerUserDetails.status) {
        const resultData = {
          userId: registerUserDetails.data.userId,
          userName: registerUserDetails.data.userName,
          email: registerUserDetails.data.email,
          fullName: registerUserDetails.data.fullName,
          mediaCount: registerUserDetails.data.mediaCount,
          pointCount: registerUserDetails.data.pointCount,
          commentCount: registerUserDetails.data.commentCount,
          createdTime: registerUserDetails.data.createdTime,
          updatedTime: registerUserDetails.data.updatedTime
        };
        resolve({ status: true, data: resultData });
      } else {
        reject(registerUserDetails);
      }
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
};
/**
 * Login User
 * @param {
 *    userName:String  'email' || 'username' ,
 *    password:String
 *    loginControl:String 'email' || 'username'
 *   } Login
 * @returns {
 *   status:Boolen,
 *   data:{
 *         userId:String,
 *         userName:String
 *     }, 'object' || 'String'
 *   }
 */
const Login = async params => {
  console.log("params", params);
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      if (params.loginControl === "username") {
        result = await Member.findOne({ userName: params.userName });
      } else {
        result = await Member.findOne({ email: params.userName });
      }
      if (result) {
        if (result.password === params.password) {
          resolve({
            status: true,
            data: {
              userId: result._id,
              userName: result.userName
            }
          });
        } else {
          reject({
            status: false,
            data: "Şifre Hatalı"
          });
        }
      } else {
        reject({
          status: true,
          data: "Kullanıcı Bulunamadı"
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
 * LostPassword User
 * @param {
 *    userName:String 'userName' || 'email'
 *   } LostPassword
 * @returns {
 *   status:Boolen,
 *   data:{
 *       userId:ObjectId,
 *       userName:String,
 *       email:String,
 *       password:String
 *   }, 'object' || 'String'
 *   }
 */
const LostPassword = async userName => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Member.findOne({ userName });
      console.log("result", result);
      if (result) {
        resolve({
          status: true,
          data: {
            userId: result._id,
            userName: result.userName,
            email: result.email,
            password: result.password
          }
        });
      } else {
        reject({
          status: true,
          data: "Kullanıcı Bulunamadı"
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

const MemberView = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Member.findById(userId);

      if (result) {
        let data = {
          userId: result._id,
          userName: result.userName,
          email: result.email
        };
        const resultdetails = await MemberDetails.findOne({ userId });
        if (resultdetails) {
          data.fullName = resultdetails.fullName;
          data.pointCount = resultdetails.pointCount;
          data.mediaCount = resultdetails.mediaCount;
          data.commentCount = resultdetails.commentCount;
          resolve(data);
        } else {
          reject({
            status: false,
            data: "Kullanıcı bulunamadı"
          });
        }
      } else {
        reject({
          status: false,
          data: "Kullanıcı Bulunamadı"
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

const AllMember = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const members = await Member.find({});
      let users = [];
      for (const key in members) {
        if (members.hasOwnProperty(key)) {
          const user = members[key];

          const userdetails = await MemberDetails.findOne({ userId: user._id });
     
          const userobje = {
            userId:user._id,
            userName:user.userName,
            email:user.email,
            fullName: userdetails.fullName,
            pointCount: userdetails.pointCount,
            mediaCount: userdetails.mediaCount,
            commentCount: userdetails.commentCount
          };

          users.push(userobje);
        }
      }
      resolve({ status: true, data: users });
    } catch (error) {
      reject({ status: false, data: error });
    }
  });
};
module.exports = {
  Register,
  Login,
  LostPassword,
  MemberView,
  AllMember
};
