# Example Ruby file with emojis for testing the VS Code Emoji to Unicode Converter extension

# Ruby class with emoji in comments
class Feedback
  # Initialize with a rating emoji 🌟
  def initialize(rating, message = nil)
    @rating = rating
    @message = message
  end

  # Convert rating to emoji representation 😊
  def rating_emoji
    case @rating
    when 5
      '⭐⭐⭐⭐⭐' # Perfect!
    when 4
      '⭐⭐⭐⭐' # Great
    when 3
      '⭐⭐⭐' # Good
    when 2
      '⭐⭐' # Fair
    when 1
      '⭐'         # Poor
    else
      '❓'         # Unknown rating
    end
  end

  # Display formatted feedback with emojis 🎨
  def display
    if @message
      puts "Rating: #{rating_emoji} - #{@message}"
    else
      puts "Rating: #{rating_emoji}"
    end
  end

  # Class method to generate random feedback 🎲
  def self.random
    rating = rand(1..5)
    messages = [
      'Loved it! 😍',
      'Great experience! 👍',
      'Could be better 🤔',
      'Needs improvement 😐',
      'Not happy with service 😢'
    ]

    Feedback.new(rating, messages.sample)
  end
end

# Create and display some feedback with emojis
feedback1 = Feedback.new(5, 'Amazing experience! 🚀')
feedback1.display

feedback2 = Feedback.new(2, 'Service was slow 🐢')
feedback2.display

# Generate random feedback 🎯
3.times do
  random_feedback = Feedback.random
  random_feedback.display
end

puts 'Ruby loves gems 💎'
