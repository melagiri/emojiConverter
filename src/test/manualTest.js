/**
 * Manual Test Script for Emoji/Unicode Conversion
 * 
 * This script tests the basic functionality of the convertEmojisToUnicode and convertUnicodeToEmojis functions.
 * To run it, compile the extension and then run: node ./out/test/manualTest.js
 */

const { convertEmojisToUnicode, convertUnicodeToEmojis } = require('../extension');

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        console.error(`❌ FAILED: ${message}`);
        console.error(`   Expected: ${expected}`);
        console.error(`   Actual:   ${actual}`);
        return false;
    }
    console.log(`✅ PASSED: ${message}`);
    return true;
}

function runTests() {
    let testsPassed = 0;
    let testsFailed = 0;

    console.log('Starting manual tests for Emoji/Unicode conversion functions\n');

    // Test 1: Convert emoji to Unicode
    {
        const input = "This is a test with emoji 😊";
        const expected = "This is a test with emoji \\u{1F60A}";
        const result = convertEmojisToUnicode(input);

        if (assertEqual(result, expected, "Convert emoji to Unicode")) {
            testsPassed++;
        } else {
            testsFailed++;
        }
    }

    // Test 2: Convert Unicode to emoji
    {
        const input = "This is a test with Unicode \\u{1F60A}";
        const expected = "This is a test with Unicode 😊";
        const result = convertUnicodeToEmojis(input);

        if (assertEqual(result, expected, "Convert Unicode to emoji")) {
            testsPassed++;
        } else {
            testsFailed++;
        }
    }

    // Test 3: Convert multiple emojis to Unicode
    {
        const input = "Multiple emojis: 😊 👍 🚀";
        const expected = "Multiple emojis: \\u{1F60A} \\u{1F44D} \\u{1F680}";
        const result = convertEmojisToUnicode(input);

        if (assertEqual(result, expected, "Convert multiple emojis to Unicode")) {
            testsPassed++;
        } else {
            testsFailed++;
        }
    }

    // Test 4: Convert multiple Unicode to emojis
    {
        const input = "Multiple Unicode: \\u{1F60A} \\u{1F44D} \\u{1F680}";
        const expected = "Multiple Unicode: 😊 👍 🚀";
        const result = convertUnicodeToEmojis(input);

        if (assertEqual(result, expected, "Convert multiple Unicode to emojis")) {
            testsPassed++;
        } else {
            testsFailed++;
        }
    }

    // Test 5: Round-trip conversion (emoji → Unicode → emoji)
    {
        const original = "Round trip: 😊 👍 🚀";
        const toUnicode = convertEmojisToUnicode(original);
        const backToEmoji = convertUnicodeToEmojis(toUnicode);

        if (assertEqual(backToEmoji, original, "Round-trip conversion (emoji → Unicode → emoji)")) {
            testsPassed++;
        } else {
            testsFailed++;
        }
    }

    // Test 6: Bidirectional conversion with mixed content
    {
        const mixed = "Mixed content: 😊 and \\u{1F44D}";

        // Test 6a: Convert Unicode to emoji in mixed content
        const allEmojis = convertUnicodeToEmojis(mixed);
        if (assertEqual(allEmojis, "Mixed content: 😊 and 👍", "Convert Unicode to emoji in mixed content")) {
            testsPassed++;
        } else {
            testsFailed++;
        }

        // Test 6b: Convert emoji to Unicode in mixed content
        const allUnicode = convertEmojisToUnicode(mixed);
        if (assertEqual(allUnicode, "Mixed content: \\u{1F60A} and \\u{1F44D}", "Convert emoji to Unicode in mixed content")) {
            testsPassed++;
        } else {
            testsFailed++;
        }
    }

    // Summary
    console.log(`\nTest Summary: ${testsPassed} passed, ${testsFailed} failed`);

    if (testsFailed > 0) {
        console.log('❌ Some tests failed!');
        process.exit(1);
    } else {
        console.log('✅ All tests passed!');
    }
}

// Run the tests
runTests();
