import './style.css';
import { getWeatherData, processWeatherData, displayWeatherInfo, updatePageStyle } from './weather';

const form = document.getElementById('weather-form');
const loadingElement = document.getElementById('loading');
const unitSwitch = document.getElementById('unit-switch');

let currentWeatherData = null;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    
    showLoading();
    const weatherData = await getWeatherData(location);
    hideLoading();
    
    if (weatherData && weatherData.currentConditions) {
        currentWeatherData = processWeatherData(weatherData);
        displayWeatherInfo(currentWeatherData, unitSwitch.checked ? 'fahrenheit' : 'celsius');
        updatePageStyle(weatherData);
    } else {
        alert('Unable to fetch weather data. Please try again.');
    }
});

unitSwitch.addEventListener('change', () => {
    if (currentWeatherData) {
        displayWeatherInfo(currentWeatherData, unitSwitch.checked ? 'fahrenheit' : 'celsius');
    }
});

function showLoading() {
    loadingElement.classList.remove('hidden');
}

function hideLoading() {
    loadingElement.classList.add('hidden');
}