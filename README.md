# Character Format Converter

A VS Code extension that provides conversion between different character formats, including emojis, Unicode escape sequences, HTML entities, and Markdown shortcodes. This makes it easier for code formatters to process files containing special characters and ensures compatibility across different platforms and languages.

## Features

This extension provides commands to convert characters between multiple formats:

1. **Convert emoji characters to Unicode escape sequences**:

   - 💬 becomes `\u{1F4AC}`
   - 😊 becomes `\u{1F60A}`
   - 🚀 becomes `\u{1F680}`

2. **Convert emoji characters to HTML entities**:

   - 💬 becomes `&#128172;`
   - 😊 becomes `&#128522;`
   - 🚀 becomes `&#128640;`

3. **Convert emoji characters to Markdown shortcodes**:

   - 💬 becomes `:speech_balloon:`
   - 😊 becomes `:blush:`
   - 🚀 becomes `:rocket:`

4. **Convert back to emojis** from any of these formats:
   - `\u{1F60A}` becomes 😊
   - `&#128522;` becomes 😊
   - `:blush:` becomes 😊

This bidirectional conversion helps prevent formatting issues in code editors and ensures compatibility with tools and systems that may not properly handle special characters, while also giving you the option to switch back to visual emojis when needed.

## Usage

There are multiple ways to use this extension:

1. **Quick Format Selection**:

   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and search for "Convert Emoji/Character Format..."
   - Select your desired target format from the dropdown menu

2. **Command Palette**:

   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and search for any of the conversion commands:
     - "Convert Emojis to Unicode Escape Sequences"
     - "Convert Emojis to HTML Entities"
     - "Convert Emojis to Markdown Shortcodes"
     - "Convert Unicode Escape Sequences to Emojis"
     - "Convert HTML Entities to Emojis"
     - "Convert Markdown Shortcodes to Emojis"
     - "Toggle Between Emojis and Unicode"

3. **Keyboard Shortcut**:
   - Press `Ctrl+Alt+E` (or `Cmd+Alt+E` on macOS) to toggle between emojis and Unicode escape sequences

The extension will scan your current file and perform the selected conversion.

## Format Selection Dialog

The quickest way to use this extension is through the format selection dialog:

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
2. Type "Convert Emoji/Character Format..." and press Enter
3. Select your desired target format from the dropdown menu:

![Format Selection Dialog](https://raw.githubusercontent.com/YOUR_USERNAME/character-format-converter/main/images/format-dialog.png)

## Why Use This Extension?

- **For Web Developers**: Convert between emojis and HTML entities for proper display in HTML
- **For Documentation**: Convert emojis to Markdown shortcodes for compatibility with Markdown renderers
- **For Source Code**: Convert emojis to Unicode escape sequences for compatibility with code formatters
- **For Readability**: Convert any format back to visible emojis for better visual understanding
- **One Tool for All**: Handle multiple character format conversions with a single extension
- **Flexibility**: Choose the right format for your specific use case
- **Prevention**: Avoid encoding issues when sharing code or content

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension does not add any VS Code settings.

## Known Issues

- Some rare or complex emoji sequences may not be properly converted
- Not all emojis have corresponding Markdown shortcodes
- Please report any issues on the [GitHub repository](https://github.com/YOUR_USERNAME/character-format-converter)

## Release Notes

### 2.0.0

- Added support for HTML Entity conversion (emojis to/from HTML entities)
- Added support for Markdown Shortcode conversion (emojis to/from Markdown emoji codes)
- Added quick format selection menu
- Improved interface with command palette access only (removed context menu)
- Renamed extension to "Character Format Converter" to reflect expanded capabilities

### 1.1.0

- Added bidirectional conversion support
- New commands to convert Unicode escape sequences back to emojis
- Added toggle command to switch between formats
- Added keyboard shortcut (Ctrl+Alt+E / Cmd+Alt+E)
- Improved test coverage for all conversion scenarios

### 1.0.0

Initial release:

- Converts emoji characters to Unicode escape sequences
- Available via command palette

## Publishing

To publish this extension to the VS Code Marketplace:

1. Replace placeholder values in package.json:

   - Replace "YOUR_PUBLISHER_ID" with your actual publisher ID
   - Replace "YOUR_USERNAME" in the repository URL with your GitHub username

2. Replace placeholder in LICENSE:

   - Replace "YOUR_NAME" with your name or organization

3. Update GitHub repository link in README.md:

   - Replace "YOUR_USERNAME" with your GitHub username

4. Create a Personal Access Token (PAT) on Azure DevOps

5. Install the VSCE publishing tool:

   ```
   npm install -g @vscode/vsce
   ```

6. Package and publish:
   ```
   vsce package
   vsce publish
   ```

**Enjoy!**
