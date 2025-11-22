// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Global middleware: log method + URL (Q9)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Data files (simple JSON storage)
const DATA_DIR = __dirname;
const productsFile = path.join(DATA_DIR, 'products.json');
const usersFile = path.join(DATA_DIR, 'users.json');

// Helper to read JSON files
function readJSON(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch (err) { return []; }
}

// Q9: GET /products
app.get('/products', (req, res) => {
  const products = readJSON(productsFile);
  res.json(products);
});

// Q9: POST /products with express-validator
app.post('/products', 
  body('name').isString().notEmpty(),
  body('price').isNumeric().custom((v) => v >= 0),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const products = readJSON(productsFile);
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  }
);

// Q4: GET /users/:id (used by client UserDetails)
app.get('/users/:id', (req, res) => {
  const users = readJSON(usersFile);
  const id = String(req.params.id);
  const user = users.find(u => String(u.id) === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Q10: JWT Auth - static user
const JWT_SECRET = 'replace_this_with_secure_secret';
const STATIC_USER = { email: 'admin@test.com', password: '12345', id: 1 };

// Login route to return token
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === STATIC_USER.email && String(password) === String(STATIC_USER.password)) {
    const token = jwt.sign({ email, id: STATIC_USER.id }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to validate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token missing' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });
    req.user = user;
    next();
  });
}

// Protected route /dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}`, dashboardData: { secret: 'only-for-authenticated' } });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
