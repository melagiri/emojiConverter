import * as assert from 'assert';
import { convertEmojisToUnicode, convertUnicodeToEmojis } from '../../extension';

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

  // Test multiple emoji conversions
  test('Convert multiple emojis to Unicode escape sequences', () => {
    const input = "Multiple emojis: 😊 👍 🚀";
    const expected = "Multiple emojis: \\u{1F60A} \\u{1F44D} \\u{1F680}";
    const result = convertEmojisToUnicode(input);
    assert.strictEqual(result, expected);
  });

  // Test multiple Unicode conversions
  test('Convert multiple Unicode escape sequences to emojis', () => {
    const input = "Multiple Unicode: \\u{1F60A} \\u{1F44D} \\u{1F680}";
    const expected = "Multiple Unicode: 😊 👍 🚀";
    const result = convertUnicodeToEmojis(input);
    assert.strictEqual(result, expected);
  });

  // Test round-trip conversion
  test('Round-trip conversion (emoji → Unicode → emoji)', () => {
    const original = "Round trip: 😊 👍 🚀";
    const toUnicode = convertEmojisToUnicode(original);
    const backToEmoji = convertUnicodeToEmojis(toUnicode);
    assert.strictEqual(backToEmoji, original);
  });

  // Test bidirectional conversion with mixed content
  test('Bidirectional conversion with mixed content', () => {
    const mixed = "Mixed content: 😊 and \\u{1F44D}";
    const allEmojis = convertUnicodeToEmojis(mixed);
    assert.strictEqual(allEmojis, "Mixed content: 😊 and 👍");
    
    const allUnicode = convertEmojisToUnicode(mixed);
    assert.strictEqual(allUnicode, "Mixed content: \\u{1F60A} and \\u{1F44D}");
  });
});
