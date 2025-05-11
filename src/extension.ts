// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Emoji to Markdown shortcode mapping
const emojiToMarkdownMap: Map<string, string> = new Map([
['😀', ':grinning:'],
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
['😥', ':disappointed_relieved:'],
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
	console.log('Congratulations, your extension "emoji-converter" is now active!');

	// Register the quick format selection command
	const quickFormatCommand = vscode.commands.registerCommand('emoji-converter.quickFormatSelection', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('No active editor found');
			return;
		}

		// Show a quick pick menu for format selection
		const formatOptions = [
			{ label: 'Unicode Escape Sequences', format: 'unicode' },
			{ label: 'HTML Entities', format: 'html' },
			{ label: 'Markdown Shortcodes', format: 'markdown' },
			{ label: 'Emojis (from any format)', format: 'emoji' }
		];

		const selectedFormat = await vscode.window.showQuickPick(formatOptions, {
			placeHolder: 'Select target format for conversion',
		});

		if (!selectedFormat) {
			return; // User cancelled the selection
		}

		// Call the appropriate conversion function based on the selected format
		switch (selectedFormat.format) {
			case 'unicode':
				convertEmojisToUnicodeInEditor(editor);
				break;
			case 'html':
				convertEmojisToHtmlInEditor(editor);
				break;
			case 'markdown':
				convertEmojisToMarkdownInEditor(editor);
				break;
			case 'emoji':
				convertAllToEmojisInEditor(editor);
				break;
		}
	});

	// Register the command to convert emojis to Unicode escape sequences (Ctrl+Alt+U)
	const convertEmojiToUnicodeCommand = vscode.commands.registerCommand('emoji-converter.convertEmojiToUnicode', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertEmojisToUnicodeInEditor(editor);
			vscode.window.showInformationMessage('Emojis converted to Unicode escape sequences');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Register the command to convert emojis to HTML entities (Ctrl+Alt+H)
	const convertEmojiToHtmlCommand = vscode.commands.registerCommand('emoji-converter.convertEmojiToHtml', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertEmojisToHtmlInEditor(editor);
			vscode.window.showInformationMessage('Emojis converted to HTML entities');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Register the command to convert emojis to Markdown shortcodes (Ctrl+Alt+M)
	const convertEmojiToMarkdownCommand = vscode.commands.registerCommand('emoji-converter.convertEmojiToMarkdown', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertEmojisToMarkdownInEditor(editor);
			vscode.window.showInformationMessage('Emojis converted to Markdown shortcodes');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Register the command to convert any format to emojis (Ctrl+Alt+E)
	const convertToEmojiCommand = vscode.commands.registerCommand('emoji-converter.convertToEmoji', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			convertAllToEmojisInEditor(editor);
			vscode.window.showInformationMessage('Converted to emojis');
		} else {
			vscode.window.showWarningMessage('No active editor found');
		}
	});

	// Register the toggle command
	const toggleEmojiUnicodeCommand = vscode.commands.registerCommand('emoji-converter.toggleEmojiUnicode', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('No active editor found');
			return;
		}

		// Get the current selection or entire document text
		const document = editor.document;
		const selection = editor.selection;
		const text = selection.isEmpty 
			? document.getText() 
			: document.getText(selection);

		// Check if the text contains any emoji character
		const containsEmoji = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu.test(text);

		// Check if the text contains any Unicode escape sequence
		const containsUnicode = /\\u\{([0-9A-Fa-f]+)\}/g.test(text);

		// Toggle based on content
		if (containsEmoji) {
			convertEmojisToUnicodeInEditor(editor);
			vscode.window.showInformationMessage('Emojis converted to Unicode escape sequences');
		} else if (containsUnicode) {
			convertUnicodeToEmojisInEditor(editor);
			vscode.window.showInformationMessage('Unicode escape sequences converted to emojis');
		} else {
			vscode.window.showInformationMessage('No emojis or Unicode escape sequences found');
		}
	});

	// Register all commands
	context.subscriptions.push(quickFormatCommand);
	context.subscriptions.push(convertEmojiToUnicodeCommand);
	context.subscriptions.push(convertEmojiToHtmlCommand);
	context.subscriptions.push(convertEmojiToMarkdownCommand);
	context.subscriptions.push(convertToEmojiCommand);
	context.subscriptions.push(toggleEmojiUnicodeCommand);
}

/**
 * Helper function to apply text conversion in the editor
 * @param editor The active text editor
 * @param conversionFn The conversion function to apply
 * @param progressMessage Optional message to display in progress notification
 */
function applyConversionInEditor(
	editor: vscode.TextEditor, 
	conversionFn: (text: string) => string,
	progressMessage?: string
) {
	// Check if we have an active editor
	if (!editor) {
		return;
	}

	// Get the document and selection
	const document = editor.document;
	const selection = editor.selection;

	// Use the selected text for conversion if there's a selection, 
	// otherwise use the entire document
	if (selection.isEmpty) {
		// No selection, process the entire document
		return vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: progressMessage || 'Converting text...',
			cancellable: false
		}, async () => {
			const text = document.getText();
			const convertedText = conversionFn(text);
			
			// If text was changed, replace the entire document content
			if (convertedText !== text) {
				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(text.length)
				);
				
				await editor.edit(editBuilder => {
					editBuilder.replace(fullRange, convertedText);
				});
			}
		});
	} else {
		// There is a selection, only process that text
		const text = document.getText(selection);
		const convertedText = conversionFn(text);
		
		// If text was changed, replace only the selected content
		if (convertedText !== text) {
			editor.edit(editBuilder => {
				editBuilder.replace(selection, convertedText);
			});
		}
	}
}

/**
 * Converts all emojis in the given text editor to Unicode escape sequences
 * @param editor The active text editor
 */
function convertEmojisToUnicodeInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor, 
		convertEmojisToUnicode, 
		'Converting emojis to Unicode escape sequences...'
	);
}

/**
 * Converts Unicode escape sequences in the given text editor to emoji characters
 * @param editor The active text editor
 */
function convertUnicodeToEmojisInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor, 
		convertUnicodeToEmojis, 
		'Converting Unicode escape sequences to emojis...'
	);
}

/**
 * Converts all emojis in the given text editor to HTML entities
 * @param editor The active text editor
 */
function convertEmojisToHtmlInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor, 
		convertEmojisToHtmlEntities, 
		'Converting emojis to HTML entities...'
	);
}

/**
 * Converts HTML entities in the given text editor to emoji characters
 * @param editor The active text editor
 */
function convertHtmlToEmojisInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor, 
		convertHtmlEntitiesToEmojis, 
		'Converting HTML entities to emojis...'
	);
}

/**
 * Converts all emojis in the given text editor to Markdown shortcodes
 * @param editor The active text editor
 */
function convertEmojisToMarkdownInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor, 
		convertEmojisToMarkdown, 
		'Converting emojis to Markdown shortcodes...'
	);
}

/**
 * Converts Markdown shortcodes in the given text editor to emoji characters
 * @param editor The active text editor
 */
function convertMarkdownToEmojisInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor, 
		convertMarkdownToEmojis, 
		'Converting Markdown shortcodes to emojis...'
	);
}

/**
 * Attempts to convert any supported format to emoji characters
 * @param editor The active text editor
 */
function convertAllToEmojisInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor,
		(text: string) => {
			// Try all conversion methods to emojis
			let convertedText = convertUnicodeToEmojis(text);
			convertedText = convertHtmlEntitiesToEmojis(convertedText);
			convertedText = convertMarkdownToEmojis(convertedText);
			return convertedText;
		},
		'Converting to emojis...'
	);
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
