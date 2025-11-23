const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static('public'));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // When message comes from client
    socket.on('message', (data) => {
        console.log("Message received:", data);  // <-- Added this line (CMD OUTPUT)
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World! Real-time chat is running!');
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
