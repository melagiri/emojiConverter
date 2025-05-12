import { expect } from 'chai';
import {
  convertEmojisToUnicode,
  convertUnicodeToEmojis,
  convertEmojisToHtmlEntities,
  convertHtmlEntitiesToEmojis,
  convertEmojisToMarkdown,
  convertMarkdownToEmojis,
  composeConversions
} from '../src/conversion';

describe('Emoji Converter Extension', () => {
  describe('convertEmojisToUnicode', () => {
    it('should convert emoji to Unicode escape', () => {
      expect(convertEmojisToUnicode('💬')).to.equal('\\u{1F4AC}');
      expect(convertEmojisToUnicode('😀😃')).to.equal('\\u{1F600}\\u{1F603}');
    });
    it('should leave non-emoji text unchanged', () => {
      expect(convertEmojisToUnicode('hello')).to.equal('hello');
    });
  });

  describe('convertUnicodeToEmojis', () => {
    it('should convert Unicode escape to emoji', () => {
      expect(convertUnicodeToEmojis('\\u{1F4AC}')).to.equal('💬');
      expect(convertUnicodeToEmojis('\\u{1F600}\\u{1F603}')).to.equal('😀😃');
    });
    it('should leave non-Unicode text unchanged', () => {
      expect(convertUnicodeToEmojis('hello')).to.equal('hello');
    });
  });

  describe('convertEmojisToHtmlEntities', () => {
    it('should convert emoji to HTML entity', () => {
      expect(convertEmojisToHtmlEntities('💬')).to.equal('&#128172;');
      expect(convertEmojisToHtmlEntities('😀😃')).to.equal('&#128512;&#128515;');
    });
    it('should leave non-emoji text unchanged', () => {
      expect(convertEmojisToHtmlEntities('hello')).to.equal('hello');
    });
  });

  describe('convertHtmlEntitiesToEmojis', () => {
    it('should convert HTML entity to emoji', () => {
      expect(convertHtmlEntitiesToEmojis('&#128172;')).to.equal('💬');
      expect(convertHtmlEntitiesToEmojis('&#128512;&#128515;')).to.equal('😀😃');
    });
    it('should leave non-entity text unchanged', () => {
      expect(convertHtmlEntitiesToEmojis('hello')).to.equal('hello');
    });
  });

  describe('convertEmojisToMarkdown', () => {
    it('should convert emoji to Markdown shortcode', () => {
      expect(convertEmojisToMarkdown('💬')).to.equal(':speech_balloon:');
      expect(convertEmojisToMarkdown('😀😃')).to.equal(':grinning::smiley:');
    });
    it('should leave non-emoji text unchanged', () => {
      expect(convertEmojisToMarkdown('hello')).to.equal('hello');
    });
  });

  describe('convertMarkdownToEmojis', () => {
    it('should convert Markdown shortcode to emoji', () => {
      expect(convertMarkdownToEmojis(':speech_balloon:')).to.equal('💬');
      expect(convertMarkdownToEmojis(':grinning::smiley:')).to.equal('😀😃');
    });
    it('should leave non-markdown text unchanged', () => {
      expect(convertMarkdownToEmojis('hello')).to.equal('hello');
    });
  });

  describe('composeConversions', () => {
    it('should compose multiple conversions', () => {
      const composed = composeConversions(
        convertEmojisToUnicode,
        convertUnicodeToEmojis
      );
      expect(composed('💬')).to.equal('💬');
    });
  });

  describe('Newly added emoji markdowns', () => {
    const emojiMarkdownPairs = [
      ['👏', ':clap:'],
      ['🙏', ':pray:'],
      ['👀', ':eyes:'],
      ['💯', ':100:'],
      ['👋', ':wave:'],
      ['💪', ':muscle:'],
      ['🙈', ':see_no_evil:'],
      ['🙉', ':hear_no_evil:'],
      ['🙊', ':speak_no_evil:'],
      ['🏆', ':trophy:'],
      ['🤩', ':star_struck:'],
      ['🥳', ':partying_face:'],
      ['🤔', ':thinking_face:'],
      ['🤦', ':facepalm:'],
      ['🤷', ':shrug:'],
      ['🎊', ':confetti_ball:'],
      ['✨', ':sparkles:'],
      ['💥', ':boom:'],
      ['💡', ':bulb:'],
      ['⚠️', ':warning:'],
      ['💤', ':zzz:'],
      ['⏳', ':hourglass:'],
      ['📅', ':calendar:'],
      ['📝', ':memo:'],
      ['📌', ':pushpin:'],
      ['🔒', ':lock:'],
      ['🔓', ':unlock:'],
      ['🔑', ':key:'],
      ['🔔', ':bell:'],
      ['🔍', ':mag:'],
      ['🔖', ':bookmark:'],
      ['🔗', ':link:'],
      ['✉️', ':email:'],
      ['☎️', ':phone:'],
      ['🔧', ':wrench:'],
      ['🔨', ':hammer:'],
      ['🔩', ':nut_and_bolt:'],
      ['⚙️', ':gear:'],
      ['🎯', ':dart:'],
      ['🎁', ':gift:'],
      ['💰', ':moneybag:'],
      ['💳', ':credit_card:'],
      ['📈', ':chart_with_upwards_trend:'],
      ['📉', ':chart_with_downwards_trend:'],
      ['📊', ':bar_chart:'],
      ['📋', ':clipboard:'],
      ['📁', ':file_folder:'],
      ['📦', ':package:'],
      ['✏️', ':pencil2:'],
      ['📚', ':books:'],
      ['🔬', ':microscope:'],
      ['🔭', ':telescope:'],
      ['🔋', ':battery:'],
      ['🔌', ':electric_plug:'],
      ['🔦', ':flashlight:'],
      ['🕯️', ':candle:'],
      ['🗑️', ':wastebasket:'],
      ['💎', ':gem:'],
      ['🛒', ':shopping_cart:'],
      ['🚪', ':door:'],
      ['🛏️', ':bed:'],
      ['🚽', ':toilet:'],
      ['🚿', ':shower:'],
      ['🛁', ':bathtub:'],
      ['⏰', ':alarm_clock:'],
      ['⏱️', ':stopwatch:'],
      ['⏲️', ':timer_clock:'],
      ['🕰️', ':mantelpiece_clock:'],
    ];
    // Normalize emoji and markdown for comparison (removes variation selectors)
    function normalizeEmoji(str: string) {
      return str.normalize('NFKD').replace(/\uFE0F/g, '');
    }
    it('should convert emoji to markdown', () => {
      for (const [emoji, markdown] of emojiMarkdownPairs) {
        expect(normalizeEmoji(convertEmojisToMarkdown(emoji))).to.equal(normalizeEmoji(markdown));
      }
    });
    it('should convert markdown to emoji', () => {
      for (const [emoji, markdown] of emojiMarkdownPairs) {
        expect(normalizeEmoji(convertMarkdownToEmojis(markdown))).to.equal(normalizeEmoji(emoji));
      }
    });
    it('should handle a random sequence of new emoji', () => {
      const emojis = emojiMarkdownPairs.map(([e]) => e).join('');
      const markdowns = emojiMarkdownPairs.map(([, m]) => m).join('');
      expect(normalizeEmoji(convertEmojisToMarkdown(emojis))).to.equal(normalizeEmoji(markdowns));
      expect(normalizeEmoji(convertMarkdownToEmojis(markdowns))).to.equal(normalizeEmoji(emojis));
    });
  });
});
