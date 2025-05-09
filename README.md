# Emoji and Unicode Converter

A VS Code extension that provides bidirectional conversion between emojis and their Unicode escape sequences. This makes it easier for code formatters to process files containing emoji characters, and also allows you to convert Unicode escape sequences back to visual emojis.

## Features

This extension provides commands to:

1. **Convert emoji characters to Unicode escape sequences**:

   - 💬 becomes `\u{1F4AC}`
   - 😊 becomes `\u{1F60A}`
   - 🚀 becomes `\u{1F680}`

2. **Convert Unicode escape sequences back to emoji characters**:

   - `\u{1F4AC}` becomes 💬
   - `\u{1F60A}` becomes 😊
   - `\u{1F680}` becomes 🚀

3. **Toggle between emojis and Unicode escape sequences** with a single command.

This bidirectional conversion helps prevent formatting issues in code editors and ensures compatibility with tools and systems that may not properly handle emoji characters, while also giving you the option to switch back to visual emojis when needed.

## Usage

There are multiple ways to use this extension:

1. **Command Palette**:

   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and search for:
     - "Convert Emojis to Unicode Escape Sequences"
     - "Convert Unicode Escape Sequences to Emojis"
     - "Toggle Between Emojis and Unicode"

2. **Context Menu**:
   - Right-click in the editor and select from the context menu:
     - "Convert Emojis to Unicode Escape Sequences"
     - "Convert Unicode Escape Sequences to Emojis"
     - "Toggle Between Emojis and Unicode"

The extension will scan your current file and perform the selected conversion.

## Why Use This Extension?

- **For Development**: Convert emojis to Unicode escape sequences to ensure consistent display across different environments
- **For Readability**: Convert Unicode escape sequences back to emojis for better visual understanding
- **Flexibility**: Toggle between both formats with a single command
- **Compatibility**: Prevents formatting issues with code formatters and linters
- **Portability**: Makes code more portable across systems with different character support
- **Prevention**: Helps prevent encoding issues when sharing code

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension does not add any VS Code settings.

## Known Issues

- Some rare or complex emoji sequences may not be properly converted
- Please report any issues on the [GitHub repository](https://github.com/yourusername/emoji-to-unicode-converter)

## Release Notes

### 1.1.0

- Added bidirectional conversion support
- New commands to convert Unicode escape sequences back to emojis
- Added toggle command to switch between formats
- Improved test coverage for all conversion scenarios

### 1.0.0

Initial release of Emoji to Unicode Converter

- Converts emoji characters to Unicode escape sequences
- Available via command palette and editor context menu

**Enjoy!**
