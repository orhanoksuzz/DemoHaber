const Sequelize = require("sequelize");
const db = require('../helper/sequelize');
/**
 * @actionType
 * 0:'Up',
 * 1:'Down',
 * 2:'report',

 */
module.exports= db.sequelize.define("commentsactions", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,

  },
  commentId: {
    type: Sequelize.INTEGER
  },
  actionType: { type: Sequelize.INTEGER, defaultValue: 0 },
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
 * @actionType
 * 0:'Up',
 * 1:'Down',
 * 2:'report',

 */
/*
 const CommentsActionSchema = new Schema({
  userId: Schema.Types.ObjectId,

  commentId: Schema.Types.ObjectId,
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
*/