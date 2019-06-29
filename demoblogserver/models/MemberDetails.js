const Sequelize = require("sequelize");
const db = require('../helper/sequelize');

module.exports= db.sequelize.define("memberdetails", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER
  },
  fullName: {
    type: Sequelize.STRING
  },
  pointCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  mediaCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  commentCount: {
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

const MemberDetailsSchema = new Schema({
  userId: Schema.Types.ObjectId,
  fullName: String,
  pointCount: {
    type: Number,
    default: 0
  },
  mediaCount: {
    type: Number,
    default: 0
  },
  commentCount:{
    type:Number,
    default:0
  },
  createdTime: {
    type: Date,
    default: Date.now()
  },
  updatedTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("memberdetails", MemberDetailsSchema);
*/
