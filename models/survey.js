const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  questionId: Number,
  answer: String,
  timeTaken: Number, // dalam milidetik
  submittedAt: { type: Date, default: Date.now }
});

const surveySchema = new mongoose.Schema({
  userId: String,
  name: String,          // Added name field
  profession: String,    // Added profession field
  responses: [responseSchema]
});

module.exports = mongoose.model('Survey', surveySchema);