const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 4000; // Updated Port

// Middleware to read form data

app.use(express.urlencoded({ extended: true }));


// Serve public folder (HTML files)

app.use(express.static(path.join(__dirname, 'public')));


// Home route - loads index.html

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// MongoDB Connection

mongoose.connect('mongodb://localhost:27017/formDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo Error:", err));


// Mongoose Schema

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Form = mongoose.model('Form', formSchema);


// POST route - save form data

app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save data to MongoDB
    const newEntry = new Form({ name, email, message });
    await newEntry.save();

    // Redirect to success page
    res.redirect('/success');
  } catch (err) {
    res.status(500).send("Failed to save data");
  }
});


// Success Page Route

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});


// Start Server

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
