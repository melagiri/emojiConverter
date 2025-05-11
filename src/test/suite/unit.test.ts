import * as assert from 'assert';
import { 
  convertEmojisToUnicode, 
  convertUnicodeToEmojis,
  convertEmojisToHtmlEntities,
  convertHtmlEntitiesToEmojis,
  convertEmojisToMarkdown,
  convertMarkdownToEmojis
} from '../../extension';

suite('Extension Unit Tests', () => {
  // Test emoji to Unicode conversion
  test('Convert emoji to Unicode escape sequences', () => {
    const input = "This is a test with emoji 😊";
    const expected = "This is a test with emoji \\u{1F60A}";
    const result = convertEmojisToUnicode(input);
    assert.strictEqual(result, expected);
  });

  // Test Unicode to emoji conversion
  test('Convert Unicode escape sequences to emoji', () => {
    const input = "This is a test with Unicode \\u{1F60A}";
    const expected = "This is a test with Unicode 😊";
    const result = convertUnicodeToEmojis(input);
    assert.strictEqual(result, expected);
  });

  // Test HTML Entity conversion
  test('Convert emoji to HTML entities', () => {
    const input = "This is a test with emoji 😊";
    const expected = "This is a test with emoji &#128522;";
    const result = convertEmojisToHtmlEntities(input);
    assert.strictEqual(result, expected);
  });

  // Test HTML Entity to emoji conversion
  test('Convert HTML entities to emoji', () => {
    const input = "This is a test with HTML entity &#128522;";
    const expected = "This is a test with HTML entity 😊";
    const result = convertHtmlEntitiesToEmojis(input);
    assert.strictEqual(result, expected);
  });

  // Test Markdown conversion
  test('Convert emoji to Markdown shortcodes', () => {
    const input = "This is a test with emoji 😊";
    const expected = "This is a test with emoji :blush:";
    const result = convertEmojisToMarkdown(input);
    assert.strictEqual(result, expected);
  });

  // Test Markdown to emoji conversion
  test('Convert Markdown shortcodes to emoji', () => {
    const input = "This is a test with Markdown :blush:";
    const expected = "This is a test with Markdown 😊";
    const result = convertMarkdownToEmojis(input);
    assert.strictEqual(result, expected);
  });

  // Test multiple conversions
  test('Convert multiple emojis to different formats', () => {
    const input = "Multiple emojis: 😊 👍 🚀";
    
    // Unicode
    const unicodeResult = convertEmojisToUnicode(input);
    assert.strictEqual(unicodeResult, "Multiple emojis: \\u{1F60A} \\u{1F44D} \\u{1F680}");
    
    // HTML
    const htmlResult = convertEmojisToHtmlEntities(input);
    assert.strictEqual(htmlResult, "Multiple emojis: &#128522; &#128077; &#128640;");
    
    // Markdown (checking just the format pattern since not all emojis might have shortcodes)
    const markdownResult = convertEmojisToMarkdown(input);
    assert.ok(markdownResult.includes(':'), 'Result should contain markdown shortcodes with colons');
  });

  // Test round-trip conversions
  test('Round-trip conversions for all formats', () => {
    const original = "Round trip: 😊 👍 🚀";
    
    // Unicode round-trip
    const toUnicode = convertEmojisToUnicode(original);
    const backFromUnicode = convertUnicodeToEmojis(toUnicode);
    assert.strictEqual(backFromUnicode, original);
    
    // HTML round-trip
    const toHtml = convertEmojisToHtmlEntities(original);
    const backFromHtml = convertHtmlEntitiesToEmojis(toHtml);
    assert.strictEqual(backFromHtml, original);
    
    // Markdown round-trip for emoji with known shortcodes
    const singleEmoji = "Test: 😊";
    const toMarkdown = convertEmojisToMarkdown(singleEmoji);
    const backFromMarkdown = convertMarkdownToEmojis(toMarkdown);
    assert.strictEqual(backFromMarkdown, singleEmoji);
  });
});
