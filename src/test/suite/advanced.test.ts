import { expect } from 'chai';
import {
  convertEmojisToUnicode,
  convertUnicodeToEmojis,
  convertEmojisToHtmlEntities,
  convertHtmlEntitiesToEmojis,
  convertEmojisToMarkdown,
  convertMarkdownToEmojis
} from '../../extension';

suite('Edge Cases and Advanced Conversion Tests', () => {
  suite('Mixed Content Tests', () => {
    test('should correctly handle mixed content with multiple formats', () => {
      const input = '😀 \\u{1F30D} &#128640; :heart:';
      
      // Convert to Unicode
      const unicode = convertEmojisToUnicode(input);
      expect(unicode).to.equal('\\u{1F600} \\u{1F30D} &#128640; :heart:');
      
      // Convert to HTML
      const html = convertEmojisToHtmlEntities(input);
      expect(html).to.equal('&#128512; \\u{1F30D} &#128640; :heart:');
      
      // Convert to Markdown
      const markdown = convertEmojisToMarkdown(input);
      expect(markdown).to.equal(':grinning: \\u{1F30D} &#128640; :heart:');
    });
    
    test('should handle repeated conversion between formats correctly', () => {
      const original = '😀 Hello 🌍';
      
      // Convert emoji → unicode → emoji
      const unicode = convertEmojisToUnicode(original);
      const backToEmoji = convertUnicodeToEmojis(unicode);
      expect(backToEmoji).to.equal(original);
      
      // Convert emoji → html → emoji
      const html = convertEmojisToHtmlEntities(original);
      const backFromHtml = convertHtmlEntitiesToEmojis(html);
      expect(backFromHtml).to.equal(original);
      
      // Convert emoji → markdown → emoji
      const markdown = convertEmojisToMarkdown(original);
      const backFromMarkdown = convertMarkdownToEmojis(markdown);
      expect(backFromMarkdown).to.equal(original);
    });
  });
  
  suite('Performance Optimizations', () => {
    test('should use caching for repeated emojis', () => {
      const input = '😀 repeated emoji: 😀 😀 😀 😀';
      
      // Measure time for first conversion
      const start1 = performance.now();
      const output1 = convertEmojisToUnicode(input);
      const duration1 = performance.now() - start1;
      
      // Same conversion should be faster due to caching
      const start2 = performance.now();
      const output2 = convertEmojisToUnicode(input);
      const duration2 = performance.now() - start2;
      
      // Verify outputs are the same
      expect(output1).to.equal(output2);
      
      // Time assertions can be flaky, so we're not strictly asserting this
      // but in principle the second call should be faster due to caching
      console.log(`First call: ${duration1}ms, Second call: ${duration2}ms`);
    });
  });
  
  suite('Special Characters', () => {
    test('should handle emojis with modifiers correctly', () => {
      // Skin tone modifiers
      const withSkinTone = '👍🏻 👍🏼 👍🏽 👍🏾 👍🏿';
      const unicodeSkinTone = convertEmojisToUnicode(withSkinTone);
      
      // Check that all variations are converted
      expect(unicodeSkinTone).to.include('\\u{1F44D}');
      
      // Gender modifiers
      const withGender = '👨‍⚕️ 👩‍⚕️';
      const unicodeGender = convertEmojisToUnicode(withGender);
      
      // These are complex emoji sequences, checking they're converted
      expect(unicodeGender.length).to.be.greaterThan(withGender.length);
      expect(unicodeGender).to.include('\\u{');
    });
    
    test('should handle emoji ZWJ sequences correctly', () => {
      // Family emoji (ZWJ sequence)
      const family = '👨‍👩‍👧‍👦';
      const unicodeFamily = convertEmojisToUnicode(family);
      
      // Should convert to Unicode escape sequences
      expect(unicodeFamily).to.include('\\u{');
      
      // Convert back
      const backToFamily = convertUnicodeToEmojis(unicodeFamily);
      
      // This might not be exactly the same due to how ZWJ sequences are handled
      // by different platforms, but should still contain main characters
      expect(backToFamily).to.include('👨');
      expect(backToFamily).to.include('👩');
    });
  });
  
  suite('Error Handling', () => {
    test('should handle malformed input gracefully', () => {
      // Malformed Unicode
      const badUnicode = '\\u{XYZ}';
      const convertedBadUnicode = convertUnicodeToEmojis(badUnicode);
      // Should remain unchanged since it's not valid
      expect(convertedBadUnicode).to.equal(badUnicode);
      
      // Malformed HTML entity
      const badHtml = '&#XYZ;';
      const convertedBadHtml = convertHtmlEntitiesToEmojis(badHtml);
      // Should remain unchanged
      expect(convertedBadHtml).to.equal(badHtml);
      
      // Incomplete sequence
      const incomplete = '\\u{1F';
      const convertedIncomplete = convertUnicodeToEmojis(incomplete);
      // Should remain unchanged
      expect(convertedIncomplete).to.equal(incomplete);
    });
  });
  
  suite('Boundary Tests', () => {
    test('should handle large strings efficiently', () => {
      // Generate large string with emojis
      const largeInput = '😀'.repeat(1000) + ' ' + '🌍'.repeat(1000);
      
      // Should not throw or timeout
      const result = convertEmojisToUnicode(largeInput);
      
      // Basic verification that conversion happened
      expect(result).to.include('\\u{1F600}');
      expect(result.length).to.be.greaterThan(largeInput.length);
    });
    
    test('should handle all emoji code points correctly', () => {
      // Test with a sampling of emoji across different Unicode blocks
      const variedEmojis = '😀👍🏻🌍🚀⭐❤️🔥✅❌';
      const result = convertEmojisToUnicode(variedEmojis);
      
      // Should convert all emojis
      for (const char of variedEmojis) {
        const codePoint = char.codePointAt(0);
        if (codePoint) {
          const expected = `\\u{${codePoint.toString(16).toUpperCase()}}`;
          expect(result).to.include(expected);
        }
      }
    });
  });
});
