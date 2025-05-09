/**
 * Bidirectional Emoji/Unicode Conversion Demo
 * 
 * This file demonstrates both emoji-to-Unicode and Unicode-to-emoji conversions
 * to showcase the bidirectional capabilities of the VS Code extension.
 */

// Part 1: Original Emojis
console.log("--- Original Emojis ---");
const weatherEmojis = {
    sunny: "☀️",
    cloudy: "☁️",
    rainy: "🌧️",
    snowy: "❄️",
    stormy: "⚡",
    foggy: "🌫️"
};

// Output the original emojis
console.log(JSON.stringify(weatherEmojis, null, 2));

// Part 2: Unicode Escape Sequences
console.log("\n--- Same Data Using Unicode Escape Sequences ---");
const weatherUnicode = {
    sunny: "\u{2600}\u{FE0F}",
    cloudy: "\u{2601}\u{FE0F}",
    rainy: "\u{1F327}\u{FE0F}",
    snowy: "\u{2744}\u{FE0F}",
    stormy: "\u{26A1}",
    foggy: "\u{1F32B}\u{FE0F}"
};

// Output the Unicode escape sequences
console.log(JSON.stringify(weatherUnicode, null, 2));

// Part 3: Mixed Content
console.log("\n--- Mixed Content (Both Emojis and Unicode) ---");
const mixedWeatherData = {
    // Direct emojis
    sunny: "☀️",
    cloudy: "☁️",

    // Unicode escape sequences
    rainy: "\u{1F327}\u{FE0F}",
    snowy: "\u{2744}\u{FE0F}",

    // Mixed in strings
    forecast: "Today: ☀️, Tomorrow: \u{1F327}\u{FE0F}"
};

// Output the mixed content
console.log(JSON.stringify(mixedWeatherData, null, 2));

/**
 * Try using the VS Code extension commands on this file:
 * 
 * 1. "Convert Emojis to Unicode Escape Sequences"
 *    - Will convert all emoji characters to \u{XXXX} format
 * 
 * 2. "Convert Unicode Escape Sequences to Emojis"
 *    - Will convert all \u{XXXX} sequences to visible emoji characters
 * 
 * 3. "Toggle Between Emojis and Unicode"
 *    - Will intelligently convert in both directions
 */

// Example weather forecast function
function getWeatherForecast(city, date) {
    // This function uses both emojis and Unicode escape sequences
    const forecasts = {
        "New York": {
            "2025-05-09": { condition: "Sunny ☀️", temp: "72°F" },
            "2025-05-10": { condition: "Cloudy \u{2601}\u{FE0F}", temp: "68°F" },
            "2025-05-11": { condition: "Rainy 🌧️", temp: "65°F" }
        },
        "Los Angeles": {
            "2025-05-09": { condition: "Sunny \u{2600}\u{FE0F}", temp: "85°F" },
            "2025-05-10": { condition: "Sunny ☀️", temp: "86°F" },
            "2025-05-11": { condition: "Partly Cloudy \u{26C5}", temp: "82°F" }
        }
    };

    if (forecasts[city] && forecasts[city][date]) {
        return forecasts[city][date];
    } else {
        return { condition: "Unknown ❓", temp: "N/A" };
    }
}

// Test the forecast function
console.log("\n--- Weather Forecast Example ---");
console.log("New York Today:", getWeatherForecast("New York", "2025-05-09"));
console.log("Los Angeles Tomorrow:", getWeatherForecast("Los Angeles", "2025-05-10"));
