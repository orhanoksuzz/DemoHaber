const Member = require("../../models/Member");
const MemberDetails = require("../../models/MemberDetails");

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
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      const userData = {
        userName: params.userName,
        email: params.email,
        password: params.password,
        createdTime: today,
        updatedTime: today
      };
      Member.findOne({
        where: {
          userName: params.userName
        }
      })
        .then(member => {
          if (!member) {
            Member.create(userData)
              .then(user => {
                resolve({ status: true, data: user.dataValues });
              })
              .catch(err => reject({ status: false, data: err }));
          } else {
            resolve({ status: true, data: member.dataValues });
          }
        })
        .catch(err => reject({ status: false, data: err }));
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
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
  return new Promise(async (resolve, reject) => {
    try {
      const userDetails = {
        userId: params.userId,
        fullName: params.fullName,
        pointCount: params.pointCount,
        mediaCount: params.mediaCount,
        commentCount: params.commentCount,
        updatedTime: params.updatedTime
      };
      MemberDetails.findOne({
        where: {
          userId: params.userId
        }
      })
        .then(member => {
          if (!member) {
            MemberDetails.create(userDetails)
              .then(userdetails => {
                resolve({ status: true, data: userdetails.dataValues });
              })
              .catch(err => reject({ status: false, data: err }));
          } else {
            resolve({ status: true, data: userdetails.dataValues });
          }
        })
        .catch(err => reject({ status: false, data: err }));
    } catch (err) {
      reject({ status: false, data: err });
    }
  });
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
      console.log("registerUser", registerUser);
      if (!registerUser.status)
        reject({ status: registerUser.status, data: registerUser.data });
      DetailsRegister.userId = registerUser.data.id;
      const registerUserDetails = await MemberDetailsRegister(DetailsRegister);
      console.log("registerUserDetails", registerUserDetails);
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
        result = await Member.findOne({
          where: {
            userName: params.userName
          }
        });
        result = result.dataValues;
      } else {
        result = await Member.findOne({
          where: {
            email: params.userName
          }
        });
        result = result.dataValues;
      }
      if (result) {
        if (result.password === params.password) {
          resolve({
            status: true,
            data: {
              userId: result.id,
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
      let result = await Member.findOne({
        where: {
          userName: userName
        }
      });
      result = result.dataValues;

      if (result) {
        resolve({
          status: true,
          data: {
            userId: result.id,
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
  console.log('userId',userId);
  return new Promise(async (resolve, reject) => {
    try {
      let result = await Member.findOne({
        where: {
          id: userId
        }
      });
     
      result = result.dataValues;
      if (result) {
        let data = {
          userId: result.id,
          userName: result.userName,
          email: result.email
        };
        let resultdetails = await MemberDetails.findOne({
          where: {
            userId: data.userId
          }
        });
        resultdetails = resultdetails.dataValues;
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
const AllMemberArrays = async memberArray => {
  
  return new Promise(async(resolve,reject)=>{
    try {
      let array = [];
      for (const key in memberArray) {
        if (memberArray.hasOwnProperty(key)) {
          
        const element = memberArray[key];
        console.log('forin',element.dataValues)
         array.push(element.dataValues);
        }
      }
      resolve({status:true,data:array});
    } catch (error) {
      reject({status:false,data:'Array Oluşturulamadı'})
    }
   

  })
}
const AllMember = async () => {
  return new Promise(async (resolve, reject) => {
    try {
     
      let members = await Member.findAll({});
      members = await AllMemberArrays(members);
      members = members.status ? members.data : undefined;
      
      let users = [];
      for (const key in members) {
        if (members.hasOwnProperty(key)) {
          const user = members[key];

          let userdetails = await MemberDetails.findOne({
            where: {
              userId: user.id
            }
          });
          userdetails = userdetails.dataValues;
          const userobje = {
            userId: user.id,
            userName: user.userName,
            email: user.email,
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
