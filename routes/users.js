const mongoose = require('mongoose');

const plm = require('passport-local-mongoose');

mongoose.connect("mongodb+srv://k:3sAZlI3P9wW6tRzr@codecap.ow9gpoz.mongodb.net/?retryWrites=true&w=majority")

// mongoose.connect('mongodb://127.0.0.1:27017/codecap');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  status:{
    type: String,
    enum: ['Available','Busy','In Team'],
    default: 'Available',
  },
  college: {
    type: String
  },
  branch: {
    type: String
  },
  github: {
    type: String
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  skills: {
    type: [String]
  },
  year: {
    type: Number
  },
  linkedin: {
    type: String
  },
  role: {
    type: String
  },
  img:{
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(plm);
const User = mongoose.model('User', userSchema);

module.exports = User;