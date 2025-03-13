const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Survey = require('./models/survey');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://surveyjhonbrooke:UgPVSmfUXQxPeeIe@cluster0.gmo85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const SUS_QUESTIONS = [
    "Saya pikir saya ingin sering menggunakan sistem ini lagi (SIGEO).",
    "Saya rasa sistem ini (SIGEO) rumit untuk digunakan.",
    "Saya menganggap sistem ini (SIGEO) mudah digunakan.",
    "Saya membutuhkan bantuan orang lain atau teknisi dalam menggunakan sistem ini (SIGEO).",
    "Saya rasa fitur-fitur dalam sistem ini (SIGEO) berjalan dengan baik.",
    "Saya rasa ada banyak hal yang tidak konsisten (tidak serasi) dalam sistem ini (SIGEO).",
    "Saya rasa orang lain akan memahami cara menggunakan sistem ini (SIGEO) dengan mudah.",
    "Saya rasa sistem ini (SIGEO) membingungkan.",
    "Saya rasa tidak ada kesulitan dalam menggunakan sistem ini (SIGEO).",
    "Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem ini (SIGEO)."
];

// Submit jawaban
app.post('/api/submit', async (req, res) => {
  const { userId, name, profession, questionId, answer, timeTaken } = req.body;
  
  try {
    let survey = await Survey.findOne({ userId });
    if (!survey) {
      survey = new Survey({ 
        userId, 
        name,          // Added name
        profession,    // Added profession
        responses: [] 
      });
    } else {
      // Update name and profession if they weren't set or have changed
      survey.name = name;
      survey.profession = profession;
    }
    
    survey.responses.push({ questionId, answer, timeTaken });
    await survey.save();
    res.status(200).json({ message: 'Response saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/questions', (req, res) => {
    res.json(SUS_QUESTIONS.map((q, i) => ({ id: i, text: q })));
});
  
// Get semua data survei
app.get('/api/surveys', async (req, res) => {
try {
    const surveys = await Survey.find(); // Ambil semua dokumen dari koleksi Survey
    res.status(200).json(surveys);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Get semua pertanyaan
app.get('/api/questions', (req, res) => {
  res.json(SUS_QUESTIONS.map((q, i) => ({ id: i, text: q })));
});

app.get('/test', (req, res) => {
  res.send('test')
});

app.listen(5000, () => console.log('Server running on port 5000'));