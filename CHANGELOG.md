# Change Log

All notable changes to the "emoji-converter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

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
