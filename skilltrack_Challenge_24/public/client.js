// client.js
// Handles upload form, materials listing, and socket.io chat

(async function () {
  const apiBase = ''; // same origin
  const uploadForm = document.getElementById('uploadForm');
  const fileInput = document.getElementById('fileInput');
  const uploadResult = document.getElementById('uploadResult');
  const materialsList = document.getElementById('materialsList');
  const refreshBtn = document.getElementById('refreshMaterials');

  // Upload handler
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    uploadResult.textContent = 'Uploading...';
    const file = fileInput.files[0];
    if (!file) { uploadResult.textContent = 'Choose a file first.'; return; }
    if (file.type !== 'application/pdf') { uploadResult.textContent = 'Please select a PDF file.'; return; }

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch(`${apiBase}/upload`, { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || JSON.stringify(data));
      uploadResult.textContent = `Uploaded: ${data.message}`;
      fileInput.value = '';
      loadMaterials();
    } catch (err) {
      console.error(err);
      uploadResult.style.color = 'red';
      uploadResult.textContent = 'Upload failed: ' + err.message;
      setTimeout(()=> uploadResult.style.color = 'green', 2000);
    }
  });

  // Load materials list
  async function loadMaterials () {
    materialsList.innerHTML = 'Loading...';
    try {
      const res = await fetch(`${apiBase}/materials/list`);
      const data = await res.json();
      materialsList.innerHTML = '';
      if (!data.files || data.files.length === 0) {
        materialsList.textContent = 'No materials uploaded yet.';
        return;
      }
      data.files.forEach(f => {
        const a = document.createElement('a');
        a.href = f.url;
        a.textContent = `${f.filename} (${Math.round(f.size/1024)} KB)`;
        a.target = '_blank';
        const div = document.createElement('div');
        div.appendChild(a);
        materialsList.appendChild(div);
      });
    } catch (err) {
      materialsList.textContent = 'Failed to load materials';
      console.error(err);
    }
  }

  refreshBtn.addEventListener('click', loadMaterials);
  await loadMaterials();

  /* ------------------ Socket.io chat ------------------ */
  const socket = io(); // connects to same origin
  const chatWindow = document.getElementById('chatWindow');
  const nameInput = document.getElementById('nameInput');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');
  const roomInput = document.getElementById('roomInput');

  // Helper to append message
  function appendMsg(text, small=false) {
    const p = document.createElement('div');
    p.innerHTML = text;
    if (small) p.style.fontSize = '0.9em';
    chatWindow.appendChild(p);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Join a room when user sets name & room (optional)
  function joinRoom() {
    const name = nameInput.value.trim();
    const room = roomInput.value.trim();
    socket.emit('join', { name: name || 'Guest', room: room || null });
  }

  // Listen for messages
  socket.on('chatMessage', (msg) => {
    appendMsg(`<strong>${escapeHtml(msg.name)}:</strong> ${escapeHtml(msg.message)} <small>${new Date(msg.ts).toLocaleTimeString()}</small>`);
  });

  socket.on('systemMessage', (m) => {
    appendMsg(`<em>${escapeHtml(m.text)}</em>`, true);
  });

  // Send message
  sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (!message) return;
    const payload = { name: nameInput.value || 'Guest', message, room: roomInput.value || null };
    socket.emit('chatMessage', payload);
    // local echo
    appendMsg(`<strong>${escapeHtml(payload.name)} (you):</strong> ${escapeHtml(payload.message)} <small>${new Date().toLocaleTimeString()}</small>`);
    messageInput.value = '';
  });

  // Utility to escape HTML (very small)
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  // If user changes name/room, rejoin
  nameInput.addEventListener('change', joinRoom);
  roomInput.addEventListener('change', joinRoom);
})();
