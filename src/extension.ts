// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Emoji to Markdown shortcode mapping
const emojiToMarkdownMap: Map<string, string> = new Map([
['��', ':grinning:'],
['😃', ':smiley:'],
['😄', ':smile:'],
['😁', ':grin:'],
['😆', ':laughing:'],
['😅', ':sweat_smile:'],
['🤣', ':rofl:'],
['😂', ':joy:'],
['🙂', ':slightly_smiling_face:'],
['🙃', ':upside_down_face:'],
['😉', ':wink:'],
['😊', ':blush:'],
['😇', ':innocent:'],
['😍', ':heart_eyes:'],
['🥰', ':smiling_face_with_three_hearts:'],
['😘', ':kissing_heart:'],
['😗', ':kissing:'],
['☺️', ':relaxed:'],
['😚', ':kissing_closed_eyes:'],
['😙', ':kissing_smiling_eyes:'],
['🥲', ':smiling_face_with_tear:'],
['😋', ':yum:'],
['😛', ':stuck_out_tongue:'],
['😜', ':stuck_out_tongue_winking_eye:'],
['🤪', ':zany_face:'],
['😝', ':stuck_out_tongue_closed_eyes:'],
['🤑', ':money_mouth_face:'],
['🤗', ':hugs:'],
['🤭', ':hand_over_mouth:'],
['🤫', ':shushing_face:'],
['🤔', ':thinking:'],
['🤐', ':zipper_mouth_face:'],
['🤨', ':raised_eyebrow:'],
['😐', ':neutral_face:'],
['😑', ':expressionless:'],
['😶', ':no_mouth:'],
['😏', ':smirk:'],
['😒', ':unamused:'],
['🙄', ':roll_eyes:'],
['😬', ':grimacing:'],
['🤥', ':lying_face:'],
['😌', ':relieved:'],
['😔', ':pensive:'],
['😪', ':sleepy:'],
['🤤', ':drooling_face:'],
['😴', ':sleeping:'],
['😷', ':mask:'],
['🤒', ':face_with_thermometer:'],
['🤕', ':face_with_head_bandage:'],
['🤢', ':nauseated_face:'],
['🤮', ':vomiting_face:'],
['🤧', ':sneezing_face:'],
['🥵', ':hot_face:'],
['🥶', ':cold_face:'],
['🥴', ':woozy_face:'],
['😵', ':dizzy_face:'],
['🤯', ':exploding_head:'],
['🤠', ':cowboy_hat_face:'],
['🥳', ':partying_face:'],
['🥸', ':disguised_face:'],
['😎', ':sunglasses:'],
['🤓', ':nerd_face:'],
['🧐', ':monocle_face:'],
['😕', ':confused:'],
['😟', ':worried:'],
['🙁', ':slightly_frowning_face:'],
['☹️', ':frowning_face:'],
['😮', ':open_mouth:'],
['😯', ':hushed:'],
['😲', ':astonished:'],
['😳', ':flushed:'],
['🥺', ':pleading_face:'],
['😦', ':frowning:'],
['😧', ':anguished:'],
['😨', ':fearful:'],
['😰', ':cold_sweat:'],
['��', ':disappointed_relieved:'],
['😢', ':cry:'],
['😭', ':sob:'],
['😱', ':scream:'],
['😖', ':confounded:'],
['😣', ':persevere:'],
['😞', ':disappointed:'],
['😓', ':sweat:'],
['😩', ':weary:'],
['😫', ':tired_face:'],
['🥱', ':yawning_face:'],
['😤', ':triumph:'],
['😡', ':rage:'],
['😠', ':angry:'],
['🤬', ':cursing_face:'],
['👍', ':thumbsup:'],
['👎', ':thumbsdown:'],
['❤️', ':heart:'],
['🔥', ':fire:'],
['🚀', ':rocket:'],
['⭐', ':star:'],
['✅', ':white_check_mark:'],
['❌', ':x:'],
['🌍', ':earth_africa:'],
['🎉', ':tada:'],
]);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "character-format-converter" is now active!');

	// Register the command to convert emojis to Unicode escape sequences (Ctrl+Alt+U)
	const convertEmojiToUnicodeCommand = vscode.commands.registerCommand('emoji-to-unicode-converter.convertEmojiToUnicode', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertEmojisToUnicodeInEditor(editor);
			vscode.window.showInformationMessage('Emojis converted to Unicode escape sequences');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Register the command to convert emojis to HTML entities (Ctrl+Alt+H)
	const convertEmojiToHtmlCommand = vscode.commands.registerCommand('emoji-to-unicode-converter.convertEmojiToHtml', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertEmojisToHtmlInEditor(editor);
			vscode.window.showInformationMessage('Emojis converted to HTML entities');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Register the command to convert emojis to Markdown shortcodes (Ctrl+Alt+M)
	const convertEmojiToMarkdownCommand = vscode.commands.registerCommand('emoji-to-unicode-converter.convertEmojiToMarkdown', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertEmojisToMarkdownInEditor(editor);
			vscode.window.showInformationMessage('Emojis converted to Markdown shortcodes');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Register the command to convert any format to emojis (Ctrl+Alt+E)
	const convertToEmojiCommand = vscode.commands.registerCommand('emoji-to-unicode-converter.convertToEmoji', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertAllToEmojisInEditor(editor);
			vscode.window.showInformationMessage('Converted to emojis');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Register all commands
	context.subscriptions.push(convertEmojiToUnicodeCommand);
	context.subscriptions.push(convertEmojiToHtmlCommand);
	context.subscriptions.push(convertEmojiToMarkdownCommand);
	context.subscriptions.push(convertToEmojiCommand);
}

/**
 * Converts all emojis in the given text editor to Unicode escape sequences
 * @param editor The active text editor
 */
function convertEmojisToUnicodeInEditor(editor: vscode.TextEditor) {
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
 * Converts all emojis in the given text editor to HTML entities
 * @param editor The active text editor
 */
function convertEmojisToHtmlInEditor(editor: vscode.TextEditor) {
	const document = editor.document;
	const text = document.getText();
	
	// Replace emojis with HTML entities
	const convertedText = convertEmojisToHtmlEntities(text);
	
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
 * Converts all emojis in the given text editor to Markdown shortcodes
 * @param editor The active text editor
 */
function convertEmojisToMarkdownInEditor(editor: vscode.TextEditor) {
	const document = editor.document;
	const text = document.getText();
	
	// Replace emojis with Markdown shortcodes
	const convertedText = convertEmojisToMarkdown(text);
	
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
 * Attempts to convert any supported format to emoji characters
 * @param editor The active text editor
 */
function convertAllToEmojisInEditor(editor: vscode.TextEditor) {
	const document = editor.document;
	const text = document.getText();
	
	// Try all conversion methods to emojis
	let convertedText = convertUnicodeToEmojis(text);
	convertedText = convertHtmlEntitiesToEmojis(convertedText);
	convertedText = convertMarkdownToEmojis(convertedText);
	
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

/**
 * Converts emojis in the given text to HTML entities
 * @param text The input text containing emojis
 * @returns Text with emojis replaced by HTML entities
 */
export function convertEmojisToHtmlEntities(text: string): string {
	return text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, (match) => {
		// Get the code point of the emoji and convert it to an HTML entity
		const codePoint = match.codePointAt(0);
		if (codePoint) {
			return `&#${codePoint};`;
		}
		return match;
	});
}

/**
 * Converts emojis in the given text to Markdown shortcodes
 * @param text The input text containing emojis
 * @returns Text with emojis replaced by Markdown shortcodes
 */
export function convertEmojisToMarkdown(text: string): string {
	return text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, (match) => {
		// Look up the emoji in our map
		const shortcode = emojiToMarkdownMap.get(match);
		if (shortcode) {
			return shortcode;
		}
		
		// If we don't have a mapping, use the Unicode escape sequence as fallback
const codePoint = match.codePointAt(0);
if (codePoint) {
return `:unicode_${codePoint.toString(16)}:`;
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

/**
 * Converts HTML entities in the given text to emoji characters
 * @param text The input text containing HTML entities
 * @returns Text with HTML entities replaced by emoji characters
 */
export function convertHtmlEntitiesToEmojis(text: string): string {
return text.replace(/&#(\d+);/g, (match, codePoint) => {
try {
// Convert the decimal code point to a character
return String.fromCodePoint(parseInt(codePoint, 10));
} catch (error) {
// If conversion fails, return the original match
return match;
}
});
}

/**
 * Converts Markdown shortcodes in the given text to emoji characters
 * @param text The input text containing Markdown shortcodes
 * @returns Text with Markdown shortcodes replaced by emoji characters
 */
export function convertMarkdownToEmojis(text: string): string {
// Create a reverse mapping for Markdown to emoji
const markdownToEmojiMap = new Map();
for (const [emoji, shortcode] of emojiToMarkdownMap.entries()) {
markdownToEmojiMap.set(shortcode, emoji);
}

// Replace all shortcodes with their corresponding emojis
return text.replace(/:([\w_]+):/g, (match, shortcode) => {
const fullShortcode = `:${shortcode}:`;

// Check if it's a known shortcode
		const emoji = markdownToEmojiMap.get(fullShortcode);
		if (emoji) {
			return emoji;
		}
		
		// Check if it's our fallback unicode format (:unicode_XXXX:)
if (shortcode.startsWith('unicode_')) {
const codePoint = shortcode.substring(8); // Remove 'unicode_' prefix
try {
return String.fromCodePoint(parseInt(codePoint, 16));
} catch (error) {
// If conversion fails, return the original match
return match;
}
}

// If not found, keep the original
return match;
});
}

// This method is called when your extension is deactivated
export function deactivate() {}
