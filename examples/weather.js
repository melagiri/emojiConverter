// Example JavaScript file with emojis for testing the VS Code Emoji to Unicode Converter extension

// Weather app with emoji support 🌤️
class WeatherApp {
    constructor(location = 'New York') {
        this.location = location;
        this.forecast = [];
        console.log(`Weather app initialized for ${location} 🌍`);
    }

    // Generate a random 5-day forecast with emojis 📅
    generateForecast() {
        const weatherTypes = [
            { type: 'Sunny', emoji: '☀️', tempRange: [75, 95] },
            { type: 'Partly Cloudy', emoji: '⛅', tempRange: [65, 85] },
            { type: 'Cloudy', emoji: '☁️', tempRange: [60, 75] },
            { type: 'Rainy', emoji: '🌧️', tempRange: [50, 70] },
            { type: 'Thunderstorms', emoji: '⛈️', tempRange: [55, 75] },
            { type: 'Snowy', emoji: '❄️', tempRange: [20, 35] },
            { type: 'Foggy', emoji: '🌫️', tempRange: [45, 65] }
        ];

        this.forecast = [];
        const today = new Date();

        for (let i = 0; i < 5; i++) {
            const forecastDate = new Date();
            forecastDate.setDate(today.getDate() + i);

            // Randomly select weather
            const weatherIndex = Math.floor(Math.random() * weatherTypes.length);
            const weather = weatherTypes[weatherIndex];

            // Generate random temperature within range
            const minTemp = weather.tempRange[0];
            const maxTemp = weather.tempRange[1];
            const temp = Math.floor(Math.random() * (maxTemp - minTemp + 1)) + minTemp;

            this.forecast.push({
                date: forecastDate,
                weather: weather.type,
                emoji: weather.emoji,
                temperature: temp
            });
        }

        console.log('Forecast generated successfully! 🎉');
        return this.forecast;
    }

    // Display the weather forecast with emojis 📊
    displayForecast() {
        if (this.forecast.length === 0) {
            console.log('No forecast available. Please generate a forecast first. ❌');
            return;
        }

        console.log(`\n5-Day Weather Forecast for ${this.location} 📱`);
        console.log('-----------------------------------');

        this.forecast.forEach(day => {
            const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
            const dateStr = day.date.toLocaleDateString('en-US', dateOptions);
            console.log(`${dateStr}: ${day.weather} ${day.emoji} - ${day.temperature}°F`);
        });

        // Add some weather advice based on the first day
        this.provideWeatherAdvice(this.forecast[0]);
    }

    // Provide weather advice with emojis 💡
    provideWeatherAdvice(dayForecast) {
        console.log('\nWeather Advice:');

        switch (dayForecast.weather) {
            case 'Sunny':
                console.log('It\'s sunny! Don\'t forget sunscreen and sunglasses! 😎🧴');
                break;
            case 'Partly Cloudy':
                console.log('Partly cloudy today. A great day for outdoor activities! 🚶‍♀️');
                break;
            case 'Cloudy':
                console.log('Cloudy skies today. Might be a good day for a museum visit! 🏛️');
                break;
            case 'Rainy':
                console.log('Rain expected. Take an umbrella! ☔');
                break;
            case 'Thunderstorms':
                console.log('Thunderstorms in the forecast! Stay indoors and stay safe! ⚡');
                break;
            case 'Snowy':
                console.log('Snow is coming! Bundle up and drive carefully! 🧣🧤');
                break;
            case 'Foggy':
                console.log('It\'s foggy! Drive carefully with low visibility! 🚗');
                break;
            default:
                console.log('Check the forecast for weather details! 👀');
        }
    }

    // Change location with emoji 📍
    setLocation(newLocation) {
        this.location = newLocation;
        this.forecast = [];
        console.log(`Location updated to ${newLocation} 📍`);
    }
}

// Create a new weather app and use it
const weatherApp = new WeatherApp('San Francisco');
weatherApp.generateForecast();
weatherApp.displayForecast();

// Change location and get new forecast
weatherApp.setLocation('Tokyo 🗼');
weatherApp.generateForecast();
weatherApp.displayForecast();

// JavaScript-specific emojis
console.log('\nJavaScript is awesome! 🚀');
console.log('Happy coding! 👩‍💻👨‍💻');
