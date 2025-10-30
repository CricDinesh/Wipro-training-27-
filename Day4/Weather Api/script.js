const API_KEY = "e2a5d7f1aaf28f0ecd25044d37fecac7";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const details = document.getElementById("details");
const ctx = document.getElementById("forecastChart").getContext("2d");
const skyCanvas = document.getElementById("skyCanvas");
const skyCtx = skyCanvas.getContext("2d");

// Canvas resizing
skyCanvas.width = window.innerWidth * 0.9;
skyCanvas.height = 250;

// Leaflet Map
let map = L.map("map").setView([20, 77], 3);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

locBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
    () => alert("Location access denied!")
  );
});

async function getWeather(city) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
  if (data.cod !== 200) {
    alert("City not found!");
    return;
  }
  updateUI(data);
  getForecast(data.coord.lat, data.coord.lon);
  showSkyEffect(data.weather[0].main);
  map.setView([data.coord.lat, data.coord.lon], 8);
  L.marker([data.coord.lat, data.coord.lon]).addTo(map);
}

async function getWeatherByCoords(lat, lon) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
  updateUI(data);
  getForecast(lat, lon);
  showSkyEffect(data.weather[0].main);
  map.setView([lat, lon], 8);
  L.marker([lat, lon]).addTo(map);
}

function updateUI(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${data.main.temp.toFixed(1)}°C`;
  condition.textContent = data.weather[0].description;
  details.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;
}

async function getForecast(lat, lon) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
  const labels = daily.map(d => new Date(d.dt_txt).toLocaleDateString());
  const temps = daily.map(d => d.main.temp);
  renderChart(labels, temps);
}

function renderChart(labels, temps) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Temperature (°C)",
        data: temps,
        backgroundColor: "rgba(255, 214, 100, 0.7)"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

/* SKY ANIMATIONS */
function showSkyEffect(weather) {
  const w = weather.toLowerCase();
  skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
  if (w.includes("rain")) drawRain();
  else if (w.includes("snow")) drawSnow();
  else if (w.includes("clear")) drawSun();
  else if (w.includes("cloud")) drawClouds();
}

function drawRain() {
  let drops = Array(100).fill().map(() => ({
    x: Math.random() * skyCanvas.width,
    y: Math.random() * skyCanvas.height,
    l: Math.random() * 15 + 10,
    s: Math.random() * 3 + 2
  }));
  function animate() {
    skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
    skyCtx.strokeStyle = "rgba(255,255,255,0.7)";
    drops.forEach(d => {
      skyCtx.beginPath();
      skyCtx.moveTo(d.x, d.y);
      skyCtx.lineTo(d.x, d.y + d.l);
      skyCtx.stroke();
      d.y += d.s;
      if (d.y > skyCanvas.height) d.y = 0;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function drawSnow() {
  let flakes = Array(80).fill().map(() => ({
    x: Math.random() * skyCanvas.width,
    y: Math.random() * skyCanvas.height,
    r: Math.random() * 3 + 1
  }));
  function animate() {
    skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
    skyCtx.fillStyle = "white";
    flakes.forEach(f => {
      skyCtx.beginPath();
      skyCtx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      skyCtx.fill();
      f.y += 1;
      if (f.y > skyCanvas.height) f.y = 0;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function drawSun() {
  const grad = skyCtx.createRadialGradient(150, 80, 10, 150, 80, 80);
  grad.addColorStop(0, "yellow");
  grad.addColorStop(1, "rgba(255,255,100,0)");
  skyCtx.fillStyle = grad;
  skyCtx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);
}

function drawClouds() {
  skyCtx.fillStyle = "rgba(255,255,255,0.6)";
  for (let i = 0; i < 8; i++) {
    skyCtx.beginPath();
    const x = Math.random() * skyCanvas.width;
    const y = Math.random() * 120;
    skyCtx.ellipse(x, y, 60, 30, 0, 0, Math.PI * 2);
    skyCtx.fill();
  }
}
