// server/cli.js
const fs = require('fs');
const path = require('path');
const http = require('http');

const LOG_DIR = path.join(__dirname, 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
const LOG_FILE = path.join(LOG_DIR, 'app.log');

fs.appendFileSync(LOG_FILE, `${new Date().toISOString()} - App started\n`, 'utf8');
console.log('Wrote "App started" to', LOG_FILE);

// Simple JSON HTTP server returning {"status":"running"}
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify({ status: 'running' }));
});
const PORT = 5000;
server.listen(PORT, () => console.log(`Simple JSON server running on http://localhost:${PORT}`));
