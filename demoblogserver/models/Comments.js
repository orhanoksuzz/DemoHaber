const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * @mediaType
 * 0:'Media',
 * 1:'Blog'
 */
const CommentsSchema = new Schema({
  userId: Schema.Types.ObjectId,
  mediaType: {
    type: Number,
    default: 0
  },
  mediaId: Schema.Types.ObjectId,
  comments: String,
  upCount: {
    type: Number,
    default: 0
  },
  downCount: {
    type: Number,
    default: 0
  },
  reportCount: {
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

module.exports = mongoose.model("comments", CommentsSchema);
