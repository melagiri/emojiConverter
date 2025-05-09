using System;
using System.Collections.Generic;

namespace EmojiExample
{
    /// <summary>
    /// Example C# file with emojis for testing the VS Code Emoji to Unicode Converter extension 🧪
    /// </summary>
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to the C# Emoji Examples! 🎯");
            
            // Create a new emoji game
            var game = new EmojiGame();
            
            // Play a few rounds
            game.PlayRound();
            game.PlayRound();
            game.PlayRound();
            
            Console.WriteLine("Game over! Thanks for playing! 🎮");
        }
    }
    
    /// <summary>
    /// A simple game using emojis 🎲
    /// </summary>
    class EmojiGame
    {
        private readonly List<string> _challenges;
        private readonly Random _random;
        private int _score;
        
        public EmojiGame()
        {
            _challenges = new List<string>
            {
                "Name an animal that lives in water 🐬",
                "Name a fruit that is yellow 🍌",
                "Name a sport played with a ball ⚽",
                "Name a planet in our solar system 🪐",
                "Name something you find at the beach 🏖️",
                "Name a job that helps people 👩‍⚕️",
                "Name something you see in the sky at night ✨"
            };
            
            _random = new Random();
            _score = 0;
            
            Console.WriteLine("Emoji Game initialized! Your current score: 0 🎮");
        }
        
        public void PlayRound()
        {
            // Select a random challenge
            int index = _random.Next(_challenges.Count);
            string challenge = _challenges[index];
            
            Console.WriteLine($"\nChallenge: {challenge}");
            Console.Write("Your answer: ");
            string? answer = Console.ReadLine();
            
            // Simulate user input for demonstration purposes
            if (string.IsNullOrEmpty(answer))
            {
                string[] simulatedAnswers = { "dolphin", "banana", "soccer", "Mars", "sand", "doctor", "stars" };
                answer = simulatedAnswers[_random.Next(simulatedAnswers.Length)];
                Console.WriteLine($"Simulated answer: {answer}");
            }
            
            // Randomly determine if the answer is correct (for demo purposes)
            bool isCorrect = _random.Next(2) == 1;
            
            if (isCorrect)
            {
                _score++;
                Console.WriteLine($"Correct! 🎉 Your score is now: {_score}");
            }
            else
            {
                Console.WriteLine($"Sorry, that's not what we were looking for. 😢 Your score remains: {_score}");
            }
        }
    }
}
