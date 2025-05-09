// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "emoji-to-unicode-converter" is now active!');

	// Register the command to convert emojis in the current document
	const convertEmojisCommand = vscode.commands.registerCommand('emoji-to-unicode-converter.convertEmojis', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertEmojisInEditor(editor);
			vscode.window.showInformationMessage('Emojis converted to Unicode escape sequences');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Add command to context menu
	const convertEmojisTextEditorCommand = vscode.commands.registerTextEditorCommand(
		'emoji-to-unicode-converter.convertEmojisInEditor',
		(textEditor) => {
			convertEmojisInEditor(textEditor);
			vscode.window.showInformationMessage('Emojis converted to Unicode escape sequences');
		}
	);

	context.subscriptions.push(convertEmojisCommand);
	context.subscriptions.push(convertEmojisTextEditorCommand);
}

/**
 * Converts all emojis in the given text editor to Unicode escape sequences
 * @param editor The active text editor
 */
function convertEmojisInEditor(editor: vscode.TextEditor) {
	const document = editor.document;
	const text = document.getText();
	
	// Replace emojis with Unicode escape sequences
	const convertedText = convertEmojisToUnicode(text);
	
	// If text was changed, replace the entire document content
	if (convertedText !== text) {
		const fullRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(text.length)
		);
		
		editor.edit(editBuilder => {
			editBuilder.replace(fullRange, convertedText);
		});
	}
}

/**
 * Converts emojis in the given text to Unicode escape sequences
 * @param text The input text containing emojis
 * @returns Text with emojis replaced by Unicode escape sequences
 */
export function convertEmojisToUnicode(text: string): string {
	// Regular expression to match emoji characters
	// This pattern will match most common emoji characters
	return text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, (match) => {
		// Get the code point of the emoji and convert it to a Unicode escape sequence
		const codePoint = match.codePointAt(0);
		if (codePoint) {
			return `\\u{${codePoint.toString(16).toUpperCase()}}`;
		}
		return match;
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}
