const mongoose = require('mongoose');

const experienceModel = new mongoose.Schema({
  title: { type: String },
  summary: { type: String },
  location: { type: String },
  price: { type: Number },
  date: { type: Date },
  fullDescription: { type: String }
});


module.exports = mongoose.model('Experience', experienceModel);
