const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type:String,
    minlength:6
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("member", MemberSchema);
