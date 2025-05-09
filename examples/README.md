# Emoji Unicode Conversion Tests

This directory contains examples in various programming languages to test the VS Code Emoji to Unicode Converter extension.

## Testing Unicode in the Browser

To test how Unicode escape sequences look in the browser after conversion, you can use the files in this directory.

### Running the Test Server

1. Open a terminal and navigate to this directory
2. Run the included Node.js server:

```bash
node server.js
```

3. Open your browser and go to: http://localhost:3000

This will open the `emoji-test.html` file which demonstrates how browsers handle Unicode escape sequences.

### What to Expect

When JavaScript code with emojis is converted to Unicode escape sequences:

1. In the source code, emojis will appear as escape sequences like `\u{1F60A}` instead of `😊`
2. When the JavaScript code runs in a browser, the escape sequences are automatically converted back to visible emojis
3. This gives you the best of both worlds:
   - Clean, format-friendly source code
   - Proper emoji display in the browser UI

### Test Files

- `emoji-test.html` - HTML interface for testing Unicode display
- `server.js` - Simple Node.js server to run the examples
- `unicode-test.js` - JavaScript example showing how Unicode escapes work
- `weather.js` - More complex JavaScript example with many emojis
- `example.rb` - Ruby example with emojis
- `example.py` - Python example with emojis
- `example.go` - Go example with emojis
- `EmojiExample.java` - Java example with emojis
- `Program.cs` - C# example with emojis
- `example.swift` - Swift example with emojis

## How Unicode Escapes Work

When JavaScript interprets code, it automatically converts Unicode escape sequences to their corresponding characters. For example:

```javascript
// These two lines produce exactly the same result
console.log("Direct emoji: 😊");
console.log("Unicode escape: \u{1F60A}");
```

This is why our VS Code extension is useful - it allows code formatters to work with the escape sequences, while the runtime environment (browser, Node.js, etc.) will still display the proper emojis.
