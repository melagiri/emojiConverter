<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# VS Code Extension: Emoji Converter

This is a VS Code extension project that enables multi-directional conversion between emoji characters and various text formats.

## Project Context

- The extension converts between four different formats:
  - Emoji characters (like 💬)
  - Unicode escape sequences (like \u{1F4AC})
  - HTML entities (like &#128172;)
  - Markdown shortcodes (like :speech_balloon:)
- Helps improve code formatting compatibility and ensures consistent display across platforms
- Provides multiple ways for users to access conversions (keyboard shortcuts, context menu, command palette)
- Handles large documents efficiently with chunked processing and progress notifications

## Technical Details

- Written in TypeScript
- Uses VS Code's text editor, command, and progress notification APIs
- Implements smart format detection and efficient conversion algorithms
- Supports both selection-based and full document conversion
- Features a composition pattern for chaining conversions efficiently
- Stores emoji mappings in Map objects for quick lookup performance

## Key Components

1. **Format Conversion Functions**:
   - `convertEmojisToUnicode`: Converts emoji to Unicode escape sequences
   - `convertUnicodeToEmojis`: Converts Unicode escape sequences to emoji
   - `convertEmojisToHtmlEntities`: Converts emoji to HTML entities
   - `convertHtmlEntitiesToEmojis`: Converts HTML entities to emoji
   - `convertEmojisToMarkdown`: Converts emoji to Markdown shortcodes
   - `convertMarkdownToEmojis`: Converts Markdown shortcodes to emoji
   - `composeConversions`: Function composer for multi-step conversions

2. **Editor Integration**:
   - `applyConversionInEditor`: Core function for applying text transformations
   - Handles selection context, chunked processing, and progress reporting
   - Optimized for large documents (>100KB) with non-blocking chunk processing

3. **User Interface**:
   - Quick format selection dialog via `quickFormatCommand`
   - Context menu integration through `contributes.menus` configuration
   - Keyboard shortcuts for all conversion types
   - Information messages for operation feedback

## Command Structure

- `emoji-converter.quickFormatSelection` (Ctrl+Alt+Q): Quick format selection dialog
- `emoji-converter.convertToUnicode` (Ctrl+Alt+U): Convert to Unicode escape sequences
- `emoji-converter.convertToHtmlEntities` (Ctrl+Alt+H): Convert to HTML entities
- `emoji-converter.convertEmojiToMarkdown` (Ctrl+Alt+M): Convert to Markdown shortcodes
- `emoji-converter.convertToEmoji` (Ctrl+Alt+E): Convert to emojis (from any format)

## Important API Functions

- To work with this codebase, use the `get_vscode_api` tool with relevant queries to fetch VS Code API references
- Focus on these VS Code API classes:
  - `TextEditor`: For manipulating text in the editor
  - `TextDocument`: For accessing document content
  - `Range`: For defining text regions for edits
  - `Selection`: For handling user selections
  - `ProgressLocation`: For showing progress during long operations
  - `QuickPick`: For creating UI selection dialogs

## Coding Guidelines

- Follow TypeScript best practices with proper typing
- Include comprehensive JSDoc documentation comments
- Implement error handling for all editor operations
- Use regex caching to improve performance
- Prefer Map objects over Object literals for lookups
- Implement chunked processing for large documents
- Use the composition pattern for multi-step operations
