# Emoji Converter

A VS Code extension that converts emojis to various formats including Unicode escape sequences, HTML entities, and Markdown shortcodes. This makes it easier for code formatters to process files containing emoji characters and ensures compatibility across different platforms and languages.

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

   - Press `Ctrl+Alt+Q` (or `Cmd+Alt+Q` on macOS) for quick format selection dialog
   - Or press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and search for "Convert Emoji Format..."
   - Select your desired target format from the dropdown menu

2. **Context Menu**:

   - Right-click in the editor
   - Select "Emoji Converter" from the context menu
   - Choose your desired conversion option

3. **Command Palette**:

   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and search for any of the conversion commands:
     - "Convert Emojis to Unicode Escape Sequences"
     - "Convert Emojis to HTML Entities"
     - "Convert Emojis to Markdown Shortcodes"
     - "Convert to Emojis (from any format)"

4. **Keyboard Shortcuts**:
   - `Ctrl+Alt+U` (`Cmd+Alt+U` on macOS): Convert Emojis to Unicode
   - `Ctrl+Alt+H` (`Cmd+Alt+H` on macOS): Convert Emojis to HTML Entities
   - `Ctrl+Alt+M` (`Cmd+Alt+M` on macOS): Convert Emojis to Markdown Shortcodes
   - `Ctrl+Alt+E` (`Cmd+Alt+E` on macOS): Convert to Emojis (from any format)

The extension will apply the conversion to your current selection, or to the entire document if nothing is selected.

## Format Selection Dialog

The quickest way to use this extension is through the format selection dialog:

1. Press `Ctrl+Alt+Q` (or `Cmd+Alt+Q` on macOS)
2. Select your desired target format from the dropdown menu:

![Format Selection Dialog](https://raw.githubusercontent.com/melagiri/emoji-converter/main/images/format-dialog.png)

This dialog provides options for converting to all supported formats in one convenient place.

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
- Please report any issues on the [GitHub repository](https://github.com/melagiri/emoji-converter)

## Release Notes

### 1.0.0 - Initial Release

- Multiple format conversion options:
  - Convert emoji characters to Unicode escape sequences
  - Convert emoji characters to HTML entities
  - Convert emoji characters to Markdown shortcodes
  - Convert back from any format to emoji characters
- Full keyboard shortcut support
- Quick format selection menu (Ctrl+Alt+Q / Cmd+Alt+Q)
- Editor context menu integration
- Selection-based or full document conversion
- Progress indicators for large file conversions

## Publishing

To publish this extension to the VS Code Marketplace:

1. Make sure you have updated the following:

   - The publisher ID in package.json is set to your actual publisher ID
   - The repository URL in package.json points to your GitHub repository
   - The GitHub links in the README point to your repository

2. Create a Personal Access Token (PAT) on [Azure DevOps](https://dev.azure.com/vscode)

3. Install the VSCE publishing tool:

   ```
   npm install -g @vscode/vsce
   ```

4. Package and publish:
   ```
   vsce package
   vsce publish
   ```

**Enjoy!**
