const API_KEY = 'J6RJZQHHNJLDMA9MK5Y7SJWYH';

export async function getWeatherData(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

export function processWeatherData(data) {
    const currentConditions = data.currentConditions;
    const today = data.days[0];
    return {
        temperature: {
            celsius: Math.round((currentConditions.temp - 32) * 5/9),
            fahrenheit: Math.round(currentConditions.temp)
        },
        description: data.description,
        cityName: data.resolvedAddress,
        timezone: data.timezone,
        currentConditions: currentConditions,
        todayForecast: today,
        hourlyForecast: today.hours,
        alerts: data.alerts || []
    };
}
export function displayWeatherInfo(data, unit = 'celsius') {
    const weatherInfo = document.getElementById('weather-info');
    const temperature = unit === 'celsius' ? data.temperature.celsius : data.temperature.fahrenheit;
    const unitSymbol = unit === 'celsius' ? '°C' : '°F';

    weatherInfo.innerHTML = `
        <div class="weather-container">
            <div class="weather-main">
                <h2>${data.cityName}</h2>
                <p class="temp">${temperature}${unitSymbol}</p>
                <p>${data.description}</p>
            </div>
            <div class="weather-details">
                <p>Feels like: ${Math.round(data.currentConditions.feelslike)}${unitSymbol}</p>
                <p>Humidity: ${data.currentConditions.humidity}%</p>
                <p>High: ${Math.round(data.todayForecast.tempmax)}${unitSymbol}</p>
                <p>Low: ${Math.round(data.todayForecast.tempmin)}${unitSymbol}</p>
            </div>
        </div>
    `;
}

export function updatePageStyle(data) {
    const body = document.body;
    const temp = data.currentConditions.temp;
    const description = data.currentConditions.conditions.toLowerCase(); 

    const tempCelsius = Math.round((temp - 32) * 5/9);

    if (tempCelsius < 0) {
        body.style.backgroundColor = '#e0f3ff';
    } else if (tempCelsius < 10) {
        body.style.backgroundColor = '#c2e5ff';
    } else if (tempCelsius < 20) {
        body.style.backgroundColor = '#fff700';
    } else if (tempCelsius < 30) {
        body.style.backgroundColor = '#ffd300';
    } else {
        body.style.backgroundColor = '#ff6600';
    }

    if (description.includes('rain')) {
        body.style.backgroundImage = 'url("https://example.com/rain.png")';
    } else if (description.includes('cloud')) {
        body.style.backgroundImage = 'url("https://example.com/cloudy.png")';
    } else if (description.includes('clear')) {
        body.style.backgroundImage = 'url("https://example.com/clear.png")';
    } else {
        body.style.backgroundImage = 'none';
    }
}