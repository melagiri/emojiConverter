import { expect } from 'chai';
import {
  convertEmojisToUnicode,
  convertUnicodeToEmojis,
  convertEmojisToHtmlEntities,
  convertHtmlEntitiesToEmojis,
  convertEmojisToMarkdown,
  convertMarkdownToEmojis
} from '../../extension';

suite('Conversion Function Unit Tests', () => {
  suite('Emoji To Unicode Tests', () => {
    test('should convert emoji to Unicode escape sequence', () => {
      const input = '😀 Hello World 🌍';
      const output = convertEmojisToUnicode(input);
      
      expect(output).to.equal('\\u{1F600} Hello World \\u{1F30D}');
    });

    test('should handle text without emojis', () => {
      const input = 'Hello World';
      const output = convertEmojisToUnicode(input);
      
      expect(output).to.equal('Hello World');
    });

    test('should handle empty string', () => {
      const input = '';
      const output = convertEmojisToUnicode(input);
      
      expect(output).to.equal('');
    });

    test('should handle string with only emojis', () => {
      const input = '😀🌍🚀';
      const output = convertEmojisToUnicode(input);
      
      expect(output).to.equal('\\u{1F600}\\u{1F30D}\\u{1F680}');
    });
  });

  suite('Unicode To Emoji Tests', () => {
    test('should convert Unicode escape sequence to emoji', () => {
      const input = '\\u{1F600} Hello World \\u{1F30D}';
      const output = convertUnicodeToEmojis(input);
      
      expect(output).to.equal('😀 Hello World 🌍');
    });

    test('should handle text without Unicode escape sequences', () => {
      const input = 'Hello World';
      const output = convertUnicodeToEmojis(input);
      
      expect(output).to.equal('Hello World');
    });

    test('should handle empty string', () => {
      const input = '';
      const output = convertUnicodeToEmojis(input);
      
      expect(output).to.equal('');
    });

    test('should handle string with only Unicode escape sequences', () => {
      const input = '\\u{1F600}\\u{1F30D}\\u{1F680}';
      const output = convertUnicodeToEmojis(input);
      
      expect(output).to.equal('😀🌍🚀');
    });
  });

  suite('Emoji To HTML Entities Tests', () => {
    test('should convert emoji to HTML entity', () => {
      const input = '😀 Hello World 🌍';
      const output = convertEmojisToHtmlEntities(input);
      
      expect(output).to.equal('&#128512; Hello World &#127757;');
    });

    test('should handle text without emojis', () => {
      const input = 'Hello World';
      const output = convertEmojisToHtmlEntities(input);
      
      expect(output).to.equal('Hello World');
    });

    test('should handle empty string', () => {
      const input = '';
      const output = convertEmojisToHtmlEntities(input);
      
      expect(output).to.equal('');
    });

    test('should handle string with only emojis', () => {
      const input = '😀🌍🚀';
      const output = convertEmojisToHtmlEntities(input);
      
      expect(output).to.equal('&#128512;&#127757;&#128640;');
    });
  });

  suite('HTML Entities To Emoji Tests', () => {
    test('should convert HTML entity to emoji', () => {
      const input = '&#128512; Hello World &#127757;';
      const output = convertHtmlEntitiesToEmojis(input);
      
      expect(output).to.equal('😀 Hello World 🌍');
    });

    test('should handle text without HTML entities', () => {
      const input = 'Hello World';
      const output = convertHtmlEntitiesToEmojis(input);
      
      expect(output).to.equal('Hello World');
    });

    test('should handle empty string', () => {
      const input = '';
      const output = convertHtmlEntitiesToEmojis(input);
      
      expect(output).to.equal('');
    });

    test('should handle string with only HTML entities', () => {
      const input = '&#128512;&#127757;&#128640;';
      const output = convertHtmlEntitiesToEmojis(input);
      
      expect(output).to.equal('😀🌍🚀');
    });
  });

  suite('Emoji To Markdown Tests', () => {
    test('should convert emoji to Markdown shortcode', () => {
      const input = '😀 Hello World 🌍';
      const output = convertEmojisToMarkdown(input);
      
      expect(output).to.equal(':grinning: Hello World :earth_africa:');
    });

    test('should handle text without emojis', () => {
      const input = 'Hello World';
      const output = convertEmojisToMarkdown(input);
      
      expect(output).to.equal('Hello World');
    });

    test('should handle empty string', () => {
      const input = '';
      const output = convertEmojisToMarkdown(input);
      
      expect(output).to.equal('');
    });

    test('should handle string with only emojis', () => {
      const input = '😀🌍🚀';
      const output = convertEmojisToMarkdown(input);
      
      expect(output).to.equal(':grinning::earth_africa::rocket:');
    });

    test('should handle unknown emojis', () => {
      // Using an obscure emoji that may not be in the map
      const input = '🧿'; // Evil eye amulet
      const output = convertEmojisToMarkdown(input);
      
      // If not in map, should return unchanged
      expect(output).to.equal('🧿');
    });
  });

  suite('Markdown To Emoji Tests', () => {
    test('should convert Markdown shortcode to emoji', () => {
      const input = ':grinning: Hello World :earth_africa:';
      const output = convertMarkdownToEmojis(input);
      
      expect(output).to.equal('😀 Hello World 🌍');
    });

    test('should handle text without Markdown shortcodes', () => {
      const input = 'Hello World';
      const output = convertMarkdownToEmojis(input);
      
      expect(output).to.equal('Hello World');
    });

    test('should handle empty string', () => {
      const input = '';
      const output = convertMarkdownToEmojis(input);
      
      expect(output).to.equal('');
    });

    test('should handle string with only Markdown shortcodes', () => {
      const input = ':grinning::earth_africa::rocket:';
      const output = convertMarkdownToEmojis(input);
      
      expect(output).to.equal('😀🌍🚀');
    });

    test('should handle unknown shortcodes', () => {
      const input = ':not_a_real_shortcode:';
      const output = convertMarkdownToEmojis(input);
      
      // Should return unchanged if not found
      expect(output).to.equal(':not_a_real_shortcode:');
    });
  });
});
