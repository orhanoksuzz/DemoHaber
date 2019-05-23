const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * @actionType
 * 0:'Up',
 * 1:'Down',
 * 2:'report',
 * 3:'light',
 * 4:'save',
 * 5:'comments'
 */
const MediaActionSchema = new Schema({
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

module.exports = mongoose.model("mediaaction", MediaActionSchema);
