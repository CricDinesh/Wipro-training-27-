// here we will implemnt Login API that returns JWT token upon successful login
// Step 1: basics express Server setup 
// Step 2: Create a dummy user ( Hardcoded Username and password )
// Step 3: Create a login route that accepts username and password
// Step 4: Validate the credentials
// Step 5: If valid, generate JWT token and return it in response
// Step 6: If invalid, return an error message
// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Secret key for signing JWT tokens
//  In real applications, use environment variables instead of hardcoding
const SECRET_KEY = 'My_secret_key2123';

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Dummy user (for demo purposes only)
const dummyUser = {
  username: 'testuser',
  password: 'Login@123'
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate credentials
  if (username === dummyUser.username && password === dummyUser.password) {
    // Generate JWT token (valid for 1 hour)
    const token = jwt.sign({ username: dummyUser.username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  // Invalid credentials
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});

//curl post command
//curl -Method POST -Uri "http://localhost:3000/login" `
  //-Headers @{"Content-Type"="application/json"} `
//  -Body '{"username":"testuser", "password":"Login@123"}'