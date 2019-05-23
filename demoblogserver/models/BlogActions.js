const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * @actionType
 * 0:'Up',
 * 1:'Down',
 * 2:'report',
 * 3:'save',
 * 4:'comments'
 */
const BlogActionsSchema = new Schema({
  userId: Schema.Types.ObjectId,
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

module.exports = mongoose.model("blogactions", BlogActionsSchema);
