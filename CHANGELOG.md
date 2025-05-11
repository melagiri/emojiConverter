# Change Log

All notable changes to the "character-format-converter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [2.0.0] - 2025-05-11

### Added

- Expanded format support with new conversions:
  - HTML Entity conversion (emojis to/from HTML entities)
  - Markdown Shortcode conversion (emojis to/from Markdown emoji codes)
- Quick format selection menu for choosing target format
- Enhanced documentation covering all formats

### Changed

- Renamed extension to "Character Format Converter" to reflect expanded capabilities
- Improved UI with simplified access - removed context menu entries
- Restructured codebase to support multiple format conversions

### Removed

- Removed all context menu entries to simplify the UI
- Users can now access all functionality via keyboard shortcut or command palette

## [1.1.0] - 2025-05-09

### Added

- Bidirectional conversion: added ability to convert Unicode escape sequences back to emoji characters
- New commands:
  - "Convert Unicode Escape Sequences to Emojis" - converts Unicode to emojis
  - "Toggle Between Emojis and Unicode" - intelligently toggles between emoji and Unicode formats
- Unit tests for bidirectional conversion
- Keyboard shortcut (Ctrl+Alt+E / Cmd+Alt+E) for toggling between emojis and Unicode

### Changed

- Improved documentation to cover bidirectional functionality
- Updated extension name to "Emoji and Unicode Converter" to better reflect capabilities

## [1.0.0] - Initial release

- Converts emoji characters to Unicode escape sequences
- Available via command palette and editor context menu
