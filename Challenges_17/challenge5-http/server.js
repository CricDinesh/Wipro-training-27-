/**
 * Challenge 5 - Basic HTTP Server
 * Goal: Serve different responses based on browser URL path.
 * No external framework like Express is used here.
 */

const http = require("http");

// Creating an HTTP server
const server = http.createServer((req, res) => {
  // Set header for all responses
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Routing logic based on request URL
  if (req.url === "/") {
    res.end("Hello from Node.js Server");
  } 
  else if (req.url === "/about") {
    res.end("About Page");
  } 
  else {
    // If route is missing, show 404
    res.writeHead(404);
    res.end("404 - Page Not Found");
  }
});

// Server listens at port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
