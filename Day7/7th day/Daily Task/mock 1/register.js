
const formRegister = document.getElementById('registerForm');
const messageBox = document.getElementById('registerResult');

formRegister.addEventListener('submit', event => {
  event.preventDefault();

  const fullName = document.getElementById('name').value.trim();
  const userEmail = document.getElementById('email').value.trim();
  const userPhone = document.getElementById('phone').value.trim();
  const selectedEvent = document.getElementById('eventSelect').value;

  if (!fullName || !userEmail || !selectedEvent) {
    messageBox.innerHTML = '<div class="text-danger">Please fill out your name, email, and choose an event.</div>';
    return;
  }

  const storedData = JSON.parse(localStorage.getItem('registrations') || '[]');
  storedData.push({
    id: Date.now(),
    name: fullName,
    email: userEmail,
    phone: userPhone,
    eventId: selectedEvent
  });

  localStorage.setItem('registrations', JSON.stringify(storedData));

  messageBox.innerHTML = '<div class="text-success">Your registration has been submitted successfully!</div>';
  formRegister.reset();
});
