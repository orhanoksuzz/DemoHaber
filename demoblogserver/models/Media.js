const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  userId: Schema.Types.ObjectId,
  mediaType: {
    type: Number,
    default: 0
  },
  mediaDetails: Object,
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
