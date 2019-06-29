const Sequelize = require("sequelize");
const db = require('../helper/sequelize');
/**
 * @mediaType
 * 0:'Media',
 * 1:'Blog'
 */
module.exports= db.sequelize.define("comments", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER
  },
  mediaId: {
    type: Sequelize.INTEGER
  },
  mediaType: {
    type: Sequelize.INTEGER,
    default: 0
  },

  comments: {
    type: Sequelize.STRING
  },
  upCount: {
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

  createdTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedTime: {
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
 * @mediaType
 * 0:'Media',
 * 1:'Blog'
 */
/*
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
*/
