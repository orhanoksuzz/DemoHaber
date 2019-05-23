const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * @actionType
 * 0:'Up',
 * 1:'Down',
 * 2:'report',
 * @mediaType
 * 0:'media',
 * 1:'blog'
 */
const CommentsActionSchema = new Schema({
  userId: Schema.Types.ObjectId,
  mediaType: {
    type: Number,
    default: 0
  },
  mediaId: Schema.Types.ObjectId,
  actionType: {
    type: Number,
    default: 0
  },
  createdTime: {
    type: Date,
    default: Date.now
  },
  updatedTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("commentsactions", CommentsActionSchema);
