<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# VS Code Extension: Emoji to Unicode Converter

This is a VS Code extension project that converts emoji characters in code to Unicode escape sequences.

## Project Context

- The extension converts emoji characters (like 💬) to Unicode escape sequences (like \u{1F4AC})
- This helps improve code formatting compatibility
- Uses the VS Code Extension API to modify text in the editor

## Technical Details

- Written in TypeScript
- Uses VS Code's text editor and command API
- Primarily manipulates text using regex and Unicode code points

## Important API Functions

- To work with this codebase, use the `get_vscode_api` tool with relevant queries to fetch VS Code API references
- Focus on TextEditor, TextDocument, and Range classes
- Understand how to register commands and modify text in the editor

## Coding Guidelines

- Follow TypeScript best practices
- Include proper documentation comments
- Ensure proper error handling for editor operations
