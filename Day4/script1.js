

const API_KEY = "e2a5d7f1aaf28f0ecd25044d37fecac7";


const resultBox = document.getElementById("weatherResult");
const fetchButton = document.getElementById("fetchWeatherBtn");


fetchButton.addEventListener("click", async () => {
    const cityName = document.getElementById("cityInput").value.trim();

    if (cityName === "") {
        resultBox.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    await getWeather(cityName);
});


async function getWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("City not found. Please check the spelling.");
        }

        const weatherData = await response.json();
        displayWeather(weatherData);

    } catch (err) {
        console.error("Weather fetch failed:", err);
        resultBox.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
}

function displayWeather(data) {
    const city = data.name;
    const description = data.weather[0].description;
    const tempKelvin = data.main.temp;
    const tempCelsius = (tempKelvin - 273.15).toFixed(1);

    resultBox.innerHTML = `
        <h2>${city} Weather</h2>
        <p><strong>Temperature:</strong> ${tempCelsius} °C</p>
        <p><strong>Condition:</strong> ${description}</p>
    `;
}