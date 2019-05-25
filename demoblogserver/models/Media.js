const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * @mediaType{
 *  0 : Text,
 *  1 : Photo,
 *  2 : Video
 * }
 */
const MediaSchema = new Schema({
  userId: Schema.Types.ObjectId,
  mediaType: {
    type: Number,
    default: 0
  },
  mediaDetails: {
    mediaTitle:String,
    mediaUrl:String
  },
  isFake: {
    type: Boolean,
    default: false
  },
  upCount: {
    type: Number,
    default: 0
  },
  downCount: {
    type: Number,
    default: 0
  },
  lightCount: {
    type: Number,
    default: 0
  },
  reportCount: {
    type: Number,
    default: 0
  },
  saveCount: {
    type: Number,
    default: 0
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("media", MediaSchema);
