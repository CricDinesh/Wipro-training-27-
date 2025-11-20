/**
 * server.js
 * Express server that supports:
 *  - secure PDF uploads with multer to /uploads
 *  - serving uploaded files from /materials (express.static)
 *  - real-time chat via Socket.io (rooms supported)
 *
 * Clean, human-written code.
 */

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const sanitize = require('sanitize-filename');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 4000;

// -------------------------------------------------------------
// Ensure uploads folder exists
// -------------------------------------------------------------
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// -------------------------------------------------------------
// Middlewares
// -------------------------------------------------------------
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded PDF files
app.use(
  '/materials',
  express.static(UPLOAD_DIR, {
    setHeaders: (res, filePath) => {
      res.set(
        'Content-Disposition',
        `attachment; filename="${path.basename(filePath)}"`
      );
    }
  })
);

// -------------------------------------------------------------
// Multer configuration
// -------------------------------------------------------------

// Fix filename encoding (Windows → UTF-8)
function fixFilenameEncoding(originalname) {
  try {
    return Buffer.from(originalname, 'latin1').toString('utf8');
  } catch {
    return originalname; // fallback
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),

  filename: (req, file, cb) => {
    // Fix encoding, then sanitize
    const utf8Name = fixFilenameEncoding(file.originalname);
    const clean = sanitize(utf8Name);

    // Random prefix to avoid duplicate names
    const prefix = crypto.randomBytes(4).toString('hex');
    cb(null, `${prefix}-${clean}`);
  }
});

// Accept only PDFs
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMime = ['application/pdf'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedMime.includes(file.mimetype) && ext === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'));
    }
  }
});

// -------------------------------------------------------------
// Routes
// -------------------------------------------------------------

// Health check
app.get('/health', (req, res) =>
  res.json({ status: 'ok', timestamp: Date.now() })
);

// Upload PDF
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileUrl = `${req.protocol}://${req.get('host')}/materials/${encodeURIComponent(
    req.file.filename
  )}`;

  res.json({
    message: `File uploaded successfully: ${req.file.originalname}`,
    storedAs: req.file.filename,
    url: fileUrl
  });
});

// List uploaded materials
app.get('/materials/list', (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read uploads' });

    const list = files.map((fn) => {
      const fullPath = path.join(UPLOAD_DIR, fn);
      const stat = fs.statSync(fullPath);

      return {
        filename: fn,
        size: stat.size,
        url: `${req.protocol}://${req.get('host')}/materials/${encodeURIComponent(
          fn
        )}`
      };
    });

    res.json({ files: list });
  });
});

// -------------------------------------------------------------
// Socket.io - Real-Time Chat
// -------------------------------------------------------------
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('join', ({ room, name }) => {
    if (room) socket.join(room);

    socket.to(room || null).emit('systemMessage', {
      text: `${name || 'User'} joined ${room || 'chat'}`,
      ts: Date.now()
    });
  });

  socket.on('chatMessage', (payload) => {
    const out = {
      name: payload.name || 'Anonymous',
      message: payload.message || '',
      ts: Date.now()
    };

    if (payload.room) io.to(payload.room).emit('chatMessage', out);
    else io.emit('chatMessage', out);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Socket disconnected: ${socket.id} (${reason})`);
  });
});

// -------------------------------------------------------------
// Start Server
// -------------------------------------------------------------
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Upload: POST /upload (field: file)`);
});
