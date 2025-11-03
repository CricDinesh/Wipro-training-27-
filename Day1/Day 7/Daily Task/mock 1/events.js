const eventsDataPath = './data/events.json';
let eventsList = [];
const eventsDisplay = document.getElementById('eventsContainer');
const categorySelect = document.getElementById('categoryFilter');
const dateSelect = document.getElementById('dateFilter');
const filterBtn = document.getElementById('applyFilters');
const registrationSelect = document.getElementById('eventSelect');

function showEvents(items) {
  eventsDisplay.innerHTML = '';
  if (!items || items.length === 0) {
    eventsDisplay.innerHTML = '<div class="text-muted">No events found.</div>';
    return;
  }
  items.forEach(ev => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card shadow-sm">
        <img src="${ev.image}" class="card-img-top" alt="${ev.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${ev.title}</h5>
          <p class="mb-1 small">${ev.category} • ${ev.date}</p>
          <p class="mb-2 fw-bold">${ev.price > 0 ? '₹' + ev.price : 'Free Entry'}</p>
          <div class="mt-auto d-grid">
            <button class="btn btn-sm btn-outline-primary choose-event" data-id="${ev.id}">Select</button>
          </div>
        </div>
      </div>`;
    eventsDisplay.appendChild(col);
  });
}

function fillCategoryOptions(items) {
  const cats = Array.from(new Set(items.map(e => e.category)));
  categorySelect.innerHTML = '<option value="">All Categories</option>';
  cats.forEach(c => {
    const o = document.createElement('option');
    o.value = c;
    o.textContent = c;
    categorySelect.appendChild(o);
  });
}

function fillEventOptions(items) {
  registrationSelect.innerHTML = '<option value="">Select an Event</option>';
  items.forEach(e => {
    const o = document.createElement('option');
    o.value = e.id;
    o.textContent = `${e.title} • ${e.date}`;
    registrationSelect.appendChild(o);
  });
}

function applyEventFilters() {
  const cat = categorySelect.value;
  const dt = dateSelect.value;
  let filtered = [...eventsList];
  if (cat) filtered = filtered.filter(e => e.category === cat);
  if (dt) filtered = filtered.filter(e => e.date === dt);
  showEvents(filtered);
  fillEventOptions(filtered);
}

async function loadEvents() {
  try {
    const response = await fetch(eventsDataPath);
    if (!response.ok) throw new Error();
    const data = await response.json();
    eventsList = data;
  } catch {
    eventsList = [
      { id: 1, title: "Fallback Music Night", category: "Entertainment", date: "2025-12-01", price: 150, image: "https://picsum.photos/400/200?random=201" },
      { id: 2, title: "Fallback Business Meet", category: "Business", date: "2025-11-20", price: 0, image: "https://picsum.photos/400/200?random=202" }
    ];
  }
  showEvents(eventsList);
  fillCategoryOptions(eventsList);
  fillEventOptions(eventsList);
}

filterBtn.addEventListener('click', applyEventFilters);
loadEvents();
