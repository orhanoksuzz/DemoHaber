const Sequelize = require("sequelize");
const db = require('../helper/sequelize');
module.exports= db.sequelize.define(
  "blog",
  {   
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      unique: true
    },
    blog: { type: Sequelize.TEXT },
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
    saveCount: {
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
  }
);

/*
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
*/
