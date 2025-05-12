# Change Log

All notable changes to the "emoji-converter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [2.0.0] - 2025-05-12

### Added

- Full bidirectional conversion between all formats:
  - Convert between any format (Unicode, HTML, Markdown, emoji) to any other format
  - Example: Select Unicode escape sequences and convert directly to HTML entities
  - Example: Select Markdown shortcodes and convert directly to Unicode escape sequences

### Changed

- Updated command names to reflect new bidirectional capabilities
- Improved conversion logic for better format detection

## [1.1.0] - 2025-05-12

### Changed

- Updated repository URL
- Code cleanup and optimization for publishing

## [1.0.0] - 2025-05-11 - Initial release

### Features

- Multiple format conversion options:
  - Convert emoji characters to Unicode escape sequences (💬 → \u{1F4AC})
  - Convert emoji characters to HTML entities (💬 → &#128172;)
  - Convert emoji characters to Markdown shortcodes (💬 → :speech_balloon:)
  - Convert back from any format to emoji characters

### Accessibility

- Quick format selection menu (Ctrl+Alt+Q / Cmd+Alt+Q)
- Full keyboard shortcut support:
  - Ctrl+Alt+U / Cmd+Alt+U: Convert to Unicode
  - Ctrl+Alt+H / Cmd+Alt+H: Convert to HTML entities
  - Ctrl+Alt+M / Cmd+Alt+M: Convert to Markdown shortcodes
  - Ctrl+Alt+E / Cmd+Alt+E: Convert to emojis

### Integration

- Editor context menu with all conversion options
- Command palette access for all features
- Support for selection-based or full document conversion
