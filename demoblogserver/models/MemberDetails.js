const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberDetailsSchema = new Schema({
  userId: Schema.Types.ObjectId,
  fullName: String,
  pointCount: {
    type: Number,
    default: 0
  },
  mediaCount: {
    type: Number,
    default: 0
  },
  commentCount:{
    type:Number,
    default:0
  },
  createdTime: {
    type: Date,
    default: Date.now()
  },
  updatedTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("memberdetails", MemberDetailsSchema);
