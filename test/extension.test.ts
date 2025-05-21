import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  convertEmojisToUnicode,
  convertUnicodeToEmojis,
  convertEmojisToHtmlEntities,
  convertHtmlEntitiesToEmojis,
  convertEmojisToMarkdown,
  convertMarkdownToEmojis,
  composeConversions,
  regexPatterns,
  emojiToMarkdownMap,
  markdownToEmojiMap
} from '../src/conversion';
import { smartConvert, detectTextFormat, TextFormat } from '../src/extension';

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

  describe('Edge cases and coverage for conversion.ts', () => {
    it('should handle empty strings for all conversions', () => {
      expect(convertEmojisToUnicode('')).to.equal('');
      expect(convertUnicodeToEmojis('')).to.equal('');
      expect(convertEmojisToHtmlEntities('')).to.equal('');
      expect(convertHtmlEntitiesToEmojis('')).to.equal('');
      expect(convertEmojisToMarkdown('')).to.equal('');
      expect(convertMarkdownToEmojis('')).to.equal('');
    });
    it('should handle mixed content', () => {
      const input = 'Hello 💬 :speech_balloon: &#128172; \\u{1F4AC}!';
      // Only emoji is converted
      expect(convertEmojisToUnicode(input)).to.include('\\u{1F4AC}');
      expect(convertEmojisToHtmlEntities(input)).to.include('&#128172;');
      expect(convertEmojisToMarkdown(input)).to.include(':speech_balloon:');
      // Only markdown is converted
      expect(convertMarkdownToEmojis(input)).to.include('💬');
      // Only HTML entity is converted
      expect(convertHtmlEntitiesToEmojis(input)).to.include('💬');
      // Only unicode is converted
      expect(convertUnicodeToEmojis(input.replace('\\', ''))).to.include('💬');
    });
    it('should not throw on invalid unicode or html entity', () => {
      expect(() => convertUnicodeToEmojis('\\u{ZZZZ}')).to.not.throw();
      expect(() => convertHtmlEntitiesToEmojis('&#notanumber;')).to.not.throw();
    });
    it('should allow composeConversions with no functions', () => {
      const composed = composeConversions();
      expect(composed('test')).to.equal('test');
    });
    it('should allow composeConversions with one function', () => {
      const composed = composeConversions(convertEmojisToMarkdown);
      expect(composed('💬')).to.equal(':speech_balloon:');
    });
    it('regexPatterns should match expected content', () => {
      expect('💬'.match(regexPatterns.emoji)).to.not.be.null;
      expect('\\u{1F4AC}'.match(regexPatterns.unicode)).to.not.be.null;
      expect('&#128172;'.match(regexPatterns.html)).to.not.be.null;
      expect(':speech_balloon:'.match(regexPatterns.markdown)).to.not.be.null;
    });
    it('emojiToMarkdownMap and markdownToEmojiMap should be consistent', () => {
      function normalizeEmoji(str: string) {
        return str.normalize('NFKD').replace(/\uFE0F/g, '');
      }
      for (const [emoji, markdown] of emojiToMarkdownMap.entries()) {
        const shortcode = markdown.replace(/:/g, '');
        expect(normalizeEmoji(markdownToEmojiMap.get(shortcode) || '')).to.equal(normalizeEmoji(emoji));
      }
    });
  });

  describe('smartConvert and detectTextFormat', () => {
    it('should convert between supported formats', () => {
      const emoji = '😀';
      const unicode = '\\u{1F600}';
      const html = '&#128512;';
      const markdown = ':grinning:';

      expect(smartConvert(emoji, TextFormat.Unicode)).to.equal(unicode);
      expect(smartConvert(emoji, TextFormat.Html)).to.equal(html);
      expect(smartConvert(emoji, TextFormat.Markdown)).to.equal(markdown);

      expect(smartConvert(unicode, TextFormat.Emoji)).to.equal(emoji);
      expect(smartConvert(html, TextFormat.Emoji)).to.equal(emoji);
      expect(smartConvert(markdown, TextFormat.Emoji)).to.equal(emoji);
    });

    it('should identify text formats correctly', () => {
      expect(detectTextFormat('😀')).to.equal(TextFormat.Emoji);
      expect(detectTextFormat('\\u{1F600}')).to.equal(TextFormat.Unicode);
      expect(detectTextFormat('&#128512;')).to.equal(TextFormat.Html);
      expect(detectTextFormat(':grinning:')).to.equal(TextFormat.Markdown);
      expect(detectTextFormat('😀 :grinning:')).to.equal(TextFormat.Mixed);
    });
  });
});
