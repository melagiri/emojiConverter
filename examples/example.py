# Example Python file with emojis for testing the VS Code Emoji to Unicode Converter extension

class EmojiTranslator:
    """
    A class that translates emotions into emojis 😊
    """
    
    def __init__(self):
        # Dictionary of emotions and their emoji representations 📚
        self.emotion_map = {
            "happy": "😄",
            "sad": "😢",
            "angry": "😠",
            "surprised": "😲",
            "confused": "😕",
            "love": "❤️",
            "laughing": "🤣",
            "cool": "😎",
            "sleepy": "😴",
            "sick": "🤒"
        }
    
    def translate(self, emotion):
        """
        Translate an emotion to its emoji representation 🔄
        """
        emotion = emotion.lower()
        if emotion in self.emotion_map:
            return self.emotion_map[emotion]
        else:
            return "❓"  # Unknown emotion
    
    def add_emotion(self, emotion, emoji):
        """
        Add a new emotion to the translator 📝
        """
        self.emotion_map[emotion.lower()] = emoji
        print(f"Added '{emotion}' with emoji {emoji} to the translator!")
    
    def get_all_emotions(self):
        """
        Get all available emotions with their emojis 📋
        """
        return self.emotion_map


# Create a new translator
translator = EmojiTranslator()

# Translate some emotions
print("I'm feeling happy today:", translator.translate("happy"))
print("I'm feeling sad today:", translator.translate("sad"))
print("I'm feeling angry today:", translator.translate("angry"))

# Add a new emotion
translator.add_emotion("excited", "🎉")
print("I'm feeling excited today:", translator.translate("excited"))

# Print all emotions
print("\nAll available emotions:")
for emotion, emoji in translator.get_all_emotions().items():
    print(f"{emotion}: {emoji}")

# Some fun with Python
print("\nPython loves snakes: 🐍")
print("Python is powerful: 💪")
print("Happy coding! 👩‍💻👨‍💻")
