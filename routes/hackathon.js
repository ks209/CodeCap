const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String
  },
  Description: {
    type: String
  },
  registrationDeadline: {
    type: Date
  },
  prizes: {
    type: String
  },
  tools: {
    type: [String]
  },
  contactEmail: {
    type: String,
    required: true
  },
  registrationLink: {
    type: String
  },
  teamsize:{
    type: String
  },
  img:{
    type: String
  }
});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;