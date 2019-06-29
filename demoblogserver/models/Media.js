const Sequelize = require("sequelize");
const db = require('../helper/sequelize');
/**
 * @mediaType{
 *  0 : Text,
 *  1 : Photo,
 *  2 : Video
 * }
 */
module.exports= db.sequelize.define("media", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: true
  },
  mediaType: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  mediaDetails: {
    type: Sequelize.JSON
  },
  isFake: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  upCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  lightCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  downCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  reportCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  saveCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  createdTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
{
  timestamps:false
});

/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * @mediaType{
 *  0 : Text,
 *  1 : Photo,
 *  2 : Video
 * }
 */
/*
 const MediaSchema = new Schema({
  userId: Schema.Types.ObjectId,
  mediaType: {
    type: Number,
    default: 0
  },
  mediaDetails: {
    mediaTitle: String,
    mediaUrl: String
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
*/
