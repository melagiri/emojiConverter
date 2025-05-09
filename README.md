# Emoji to Unicode Converter

A VS Code extension that converts emojis in your code to their Unicode escape sequences. This makes it easier for code formatters to process files containing emoji characters.

## Features

This extension provides commands to convert emoji characters in your code to their equivalent Unicode escape sequences. For example:

- 💬 becomes `\u{1F4AC}`
- 😊 becomes `\u{1F60A}`
- 🚀 becomes `\u{1F680}`

This helps prevent formatting issues in code editors and ensures compatibility with tools and systems that may not properly handle emoji characters.

## Usage

There are two ways to use this extension:

1. **Command Palette**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and search for "Convert Emojis to Unicode Escape Sequences"

2. **Context Menu**: Right-click in the editor and select "Convert Emojis to Unicode Escape Sequences" from the context menu

The extension will scan your current file and replace all emoji characters with their Unicode escape sequence equivalents.

## Why Convert Emojis to Unicode Escape Sequences?

- Ensures consistent display across different environments
- Prevents formatting issues with code formatters and linters
- Makes code more portable across systems with different character support
- Helps prevent encoding issues when sharing code

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension does not add any VS Code settings.

## Known Issues

- Some rare or complex emoji sequences may not be properly converted
- Please report any issues on the [GitHub repository](https://github.com/yourusername/emoji-to-unicode-converter)

## Release Notes

### 1.0.0

Initial release of Emoji to Unicode Converter

- Converts emoji characters to Unicode escape sequences
- Available via command palette and editor context menu

**Enjoy!**
