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

	// Register the command to convert Unicode escape sequences back to emojis
	const convertUnicodeCommand = vscode.commands.registerCommand('emoji-to-unicode-converter.convertUnicode', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertUnicodeInEditor(editor);
			vscode.window.showInformationMessage('Unicode escape sequences converted to emojis');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Add command to context menu
	const convertUnicodeTextEditorCommand = vscode.commands.registerTextEditorCommand(
		'emoji-to-unicode-converter.convertUnicodeInEditor',
		(textEditor) => {
			convertUnicodeInEditor(textEditor);
			vscode.window.showInformationMessage('Unicode escape sequences converted to emojis');
		}
	);

	// Register the command to toggle between emojis and Unicode escape sequences
	const toggleConversionCommand = vscode.commands.registerCommand('emoji-to-unicode-converter.toggleConversion', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			toggleConversionInEditor(editor);
			vscode.window.showInformationMessage('Toggled between emojis and Unicode escape sequences');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Add toggle command to context menu
	const toggleConversionTextEditorCommand = vscode.commands.registerTextEditorCommand(
		'emoji-to-unicode-converter.toggleConversionInEditor',
		(textEditor) => {
			toggleConversionInEditor(textEditor);
			vscode.window.showInformationMessage('Toggled between emojis and Unicode escape sequences');
		}
	);

	context.subscriptions.push(convertEmojisCommand);
	context.subscriptions.push(convertEmojisTextEditorCommand);
	context.subscriptions.push(convertUnicodeCommand);
	context.subscriptions.push(convertUnicodeTextEditorCommand);
	context.subscriptions.push(toggleConversionCommand);
	context.subscriptions.push(toggleConversionTextEditorCommand);
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
 * Converts all Unicode escape sequences in the given text editor to emoji characters
 * @param editor The active text editor
 */
function convertUnicodeInEditor(editor: vscode.TextEditor) {
	const document = editor.document;
	const text = document.getText();
	
	// Replace Unicode escape sequences with emoji characters
	const convertedText = convertUnicodeToEmojis(text);
	
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
 * Toggles between emojis and Unicode escape sequences in the given text editor
 * @param editor The active text editor
 */
function toggleConversionInEditor(editor: vscode.TextEditor) {
	const document = editor.document;
	const text = document.getText();
	
	// First try to convert Unicode to emojis
	const unicodeToEmojiText = convertUnicodeToEmojis(text);
	
	// If there were changes, use that conversion
	if (unicodeToEmojiText !== text) {
		const fullRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(text.length)
		);
		
		editor.edit(editBuilder => {
			editBuilder.replace(fullRange, unicodeToEmojiText);
		});
		return;
	}
	
	// If no changes, try to convert emojis to Unicode
	const emojiToUnicodeText = convertEmojisToUnicode(text);
	
	// If there were changes, use that conversion
	if (emojiToUnicodeText !== text) {
		const fullRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(text.length)
		);
		
		editor.edit(editBuilder => {
			editBuilder.replace(fullRange, emojiToUnicodeText);
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

/**
 * Converts Unicode escape sequences in the given text to emoji characters
 * @param text The input text containing Unicode escape sequences
 * @returns Text with Unicode escape sequences replaced by emoji characters
 */
export function convertUnicodeToEmojis(text: string): string {
	// Regular expression to match Unicode escape sequences like \u{1F60A}
	return text.replace(/\\u\{([0-9A-Fa-f]+)\}/g, (match, codePoint) => {
		try {
			// Convert the hex string to a number and then to a character
			return String.fromCodePoint(parseInt(codePoint, 16));
		} catch (error) {
			// If conversion fails, return the original match
			return match;
		}
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}
