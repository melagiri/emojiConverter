/**
 * Example Java file with emojis for testing the VS Code Emoji to Unicode Converter extension
 */
public class EmojiExample {
    
    /**
     * Main method to run examples with emojis 🚀
     */
    public static void main(String[] args) {
        // Print welcome message with emoji
        System.out.println("Hello from Java! ☕");
        
        // Create a weather reporter
        WeatherReporter reporter = new WeatherReporter();
        
        // Report different weather conditions with emojis
        reporter.reportWeather("sunny");
        reporter.reportWeather("rainy");
        reporter.reportWeather("snowy");
        reporter.reportWeather("cloudy");
        reporter.reportWeather("stormy");
        
        // Print goodbye message with emoji
        System.out.println("Java programming is fun! 🎮");
    }
    
    /**
     * Inner class for weather reporting with emojis 🌈
     */
    static class WeatherReporter {
        
        /**
         * Reports weather with appropriate emoji 🌤️
         */
        public void reportWeather(String condition) {
            String report = "Today's weather: ";
            
            // Select emoji based on condition
            switch (condition.toLowerCase()) {
                case "sunny":
                    report += "Sunny and warm ☀️";
                    break;
                case "rainy":
                    report += "Rainy and wet 🌧️";
                    break;
                case "snowy":
                    report += "Snowy and cold ❄️";
                    break;
                case "cloudy":
                    report += "Cloudy and gray ☁️";
                    break;
                case "stormy":
                    report += "Stormy with lightning ⚡";
                    break;
                default:
                    report += "Unknown weather condition ❓";
                    break;
            }
            
            // Print the weather report
            System.out.println(report);
        }
    }
}
