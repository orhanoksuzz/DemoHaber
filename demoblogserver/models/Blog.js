const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  userId: Schema.Types.ObjectId,
  blog: String,
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
  saveCount: {
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

module.exports = mongoose.model("blog", BlogSchema);
