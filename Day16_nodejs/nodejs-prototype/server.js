// Import the built-in http module
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // Routing logic
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Node.js Server demo!');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is a minimal Node.js server created for prototype testing.');
  } else if (req.url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Contact us at: Dinesh@demo.com');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start listening on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
