const Sequelize = require("sequelize");
const db = require('../helper/sequelize');
module.exports= db.sequelize.define("members", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
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

const MemberSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type:String,
    minlength:6
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("member", MemberSchema);
*/
