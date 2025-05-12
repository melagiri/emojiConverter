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

// Global regex patterns for better performance (avoid recompilation)
const regexPatterns = {
	emoji: /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
	unicode: /\\u\{([0-9A-Fa-f]+)\}/g,
	html: /&#(\d+);/g,
	markdown: /:([\w_]+):/g
};

// Create a reverse mapping (Markdown → Emoji) for faster lookups
const markdownToEmojiMap: Map<string, string> = new Map();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Initialize the reverse mapping
    emojiToMarkdownMap.forEach((value, key) => {
        markdownToEmojiMap.set(value.replace(/:/g, ''), key);
    });

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
                convertToUnicodeInEditor(editor);
                break;
            case 'html':
                convertToHtmlInEditor(editor);
                break;
            case 'markdown':
                convertToMarkdownInEditor(editor);
                break;
            case 'emoji':
                convertAllToEmojisInEditor(editor);
                break;
        }
    });

    // Register the command to convert to Unicode escape sequences (Ctrl+Alt+U)
    const convertToUnicodeCommand = vscode.commands.registerCommand('emoji-converter.convertToUnicode', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            convertToUnicodeInEditor(editor);
            vscode.window.showInformationMessage('Converted to Unicode escape sequences');
        } else {
            vscode.window.showWarningMessage('No active editor found');
        }
    });

    // Register the command to convert to HTML entities (Ctrl+Alt+H)
    const convertToHtmlCommand = vscode.commands.registerCommand('emoji-converter.convertToHtmlEntities', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            convertToHtmlInEditor(editor);
            vscode.window.showInformationMessage('Converted to HTML entities');
        } else {
            vscode.window.showWarningMessage('No active editor found');
        }
    });

    // Register the command to convert to Markdown shortcodes (Ctrl+Alt+M)
    const convertEmojiToMarkdownCommand = vscode.commands.registerCommand('emoji-converter.convertEmojiToMarkdown', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            convertToMarkdownInEditor(editor);
            vscode.window.showInformationMessage('Converted to Markdown shortcodes');
        } else {
            vscode.window.showWarningMessage('No active editor found');
        }
    });

    // Register the command to convert Unicode/HTML/Markdown to emojis (Ctrl+Alt+E)
    const convertToEmojiCommand = vscode.commands.registerCommand('emoji-converter.convertToEmoji', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            convertAllToEmojisInEditor(editor);
            vscode.window.showInformationMessage('Converted to emojis');
        } else {
            vscode.window.showWarningMessage('No active editor found');
        }
    });

    // Register all commands
    context.subscriptions.push(quickFormatCommand);
    context.subscriptions.push(convertToUnicodeCommand);
    context.subscriptions.push(convertToHtmlCommand);
    context.subscriptions.push(convertEmojiToMarkdownCommand);
    context.subscriptions.push(convertToEmojiCommand);
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
		vscode.window.showErrorMessage('No active editor found');
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
			cancellable: true
		}, async (progress, token) => {
			try {
				const text = document.getText();
				
				// For large documents (>100KB), process in chunks to avoid UI freezes
				if (text.length > 100000) {
					const chunkSize = 50000; // Process in 50KB chunks
					let convertedText = '';
					let processedChunks = 0;
					const totalChunks = Math.ceil(text.length / chunkSize);
					
					// Process each chunk
					for (let i = 0; i < text.length; i += chunkSize) {
						// Check if operation was canceled
						if (token.isCancellationRequested) {
							vscode.window.showInformationMessage('Conversion canceled');
							return;
						}
						
						const chunk = text.substring(i, i + chunkSize);
						convertedText += conversionFn(chunk);
						processedChunks++;
						
						// Update progress
						progress.report({ 
							message: `Processing chunk ${processedChunks} of ${totalChunks}...`,
							increment: (1 / totalChunks) * 100
						});
						
						// Allow UI to update between chunks
						await new Promise(resolve => setTimeout(resolve, 0));
					}
					
					// Apply the converted text if it's different from the original
					if (convertedText !== text) {
						const fullRange = new vscode.Range(
							document.positionAt(0),
							document.positionAt(text.length)
						);
						
						await editor.edit(editBuilder => {
							editBuilder.replace(fullRange, convertedText);
						});
					} else {
						vscode.window.showInformationMessage('No changes were made to the document');
					}
				} else {
					// For smaller documents, process all at once
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
					} else {
						vscode.window.showInformationMessage('No changes were made to the document');
					}
				}
			} catch (error) {
				vscode.window.showErrorMessage(`Error during conversion: ${error instanceof Error ? error.message : String(error)}`);
			}
		});
	} else {
		// There is a selection, only process that text
		try {
			const text = document.getText(selection);
			const convertedText = conversionFn(text);
			
			// If text was changed, replace only the selected content
			if (convertedText !== text) {
				return editor.edit(editBuilder => {
					editBuilder.replace(selection, convertedText);
				});
			} else {
				vscode.window.showInformationMessage('No changes were made to the selection');
			}
		} catch (error) {
			vscode.window.showErrorMessage(`Error during conversion: ${error instanceof Error ? error.message : String(error)}`);
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
		// Use composition for more efficient conversions
		composeConversions(
			convertUnicodeToEmojis,
			convertHtmlEntitiesToEmojis,
			convertMarkdownToEmojis
		),
		'Converting to emojis...'
	);
}

/**
 * Composes multiple conversion functions into a single function
 * for more efficient processing of text with multiple format transformations
 * @param conversionFns Array of conversion functions to apply in sequence
 * @returns A single conversion function that applies all transformations
 */
function composeConversions(...conversionFns: Array<(text: string) => string>): (text: string) => string {
	return (text: string) => {
		return conversionFns.reduce((result, fn) => fn(result), text);
	};
}

/**
 * Converts any format to Unicode escape sequences
 * First converts any format to emojis, then converts emojis to Unicode
 * @param editor The active text editor
 */
function convertToUnicodeInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor,
		// Use composition for more efficient conversions
		composeConversions(
			convertUnicodeToEmojis,
			convertHtmlEntitiesToEmojis, 
			convertMarkdownToEmojis,
			convertEmojisToUnicode
		),
		'Converting to Unicode escape sequences...'
	);
}

/**
 * Converts any format to HTML entities
 * First converts any format to emojis, then converts emojis to HTML entities
 * @param editor The active text editor
 */
function convertToHtmlInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor,
		// Use composition for more efficient conversions
		composeConversions(
			convertUnicodeToEmojis,
			convertHtmlEntitiesToEmojis, 
			convertMarkdownToEmojis,
			convertEmojisToHtmlEntities
		),
		'Converting to HTML entities...'
	);
}

/**
 * Converts any format to Markdown shortcodes
 * First converts any format to emojis, then converts emojis to Markdown shortcodes
 * @param editor The active text editor
 */
function convertToMarkdownInEditor(editor: vscode.TextEditor) {
	applyConversionInEditor(
		editor,
		// Use composition for more efficient conversions
		composeConversions(
			convertUnicodeToEmojis,
			convertHtmlEntitiesToEmojis, 
			convertMarkdownToEmojis,
			convertEmojisToMarkdown
		),
		'Converting to Markdown shortcodes...'
	);
}

/**
 * Converts text from one format to another based on source and target formats
 * @param text The text to convert
 * @param targetFormat The desired output format
 * @returns The converted text
 */
function smartConvert(text: string, targetFormat: TextFormat): string {
	// First, detect the source format
	const sourceFormat = detectTextFormat(text);
	
	// If source and target formats are the same, no conversion needed
	if (sourceFormat === targetFormat) {
		return text;
	}
	
	// Fast conversion path for common scenarios
	if (sourceFormat === TextFormat.Emoji) {
		// Direct conversions from emoji to other formats
		switch (targetFormat) {
			case TextFormat.Unicode: return convertEmojisToUnicode(text);
			case TextFormat.Html: return convertEmojisToHtmlEntities(text);
			case TextFormat.Markdown: return convertEmojisToMarkdown(text);
			default: return text;
		}
	}
	
	// Direct format-to-format conversions to avoid unnecessary intermediate steps
	// These direct conversions improve performance by avoiding the emoji step
	const conversionKey = `${sourceFormat}_${targetFormat}`;
	
	if (sourceFormat === TextFormat.Unicode && targetFormat === TextFormat.Html) {
		// Unicode → HTML: Direct conversion without going through emoji
		regexPatterns.unicode.lastIndex = 0;
		return text.replace(regexPatterns.unicode, (_, codePoint) => 
			`&#${parseInt(codePoint, 16)};`);
	} 
	else if (sourceFormat === TextFormat.Unicode && targetFormat === TextFormat.Markdown) {
		// Unicode → Markdown: Direct conversion
		regexPatterns.unicode.lastIndex = 0;
		return text.replace(regexPatterns.unicode, (_, codePoint) => {
			const emoji = String.fromCodePoint(parseInt(codePoint, 16));
			return emojiToMarkdownMap.get(emoji) || emoji;
		});
	}
	else if (sourceFormat === TextFormat.Html && targetFormat === TextFormat.Unicode) {
		// HTML → Unicode: Direct conversion
		regexPatterns.html.lastIndex = 0;
		return text.replace(regexPatterns.html, (_, codePoint) => 
			`\\u{${parseInt(codePoint, 10).toString(16).toUpperCase()}}`);
	}
	else if (sourceFormat === TextFormat.Html && targetFormat === TextFormat.Markdown) {
		// HTML → Markdown: Direct conversion
		regexPatterns.html.lastIndex = 0;
		return text.replace(regexPatterns.html, (_, codePoint) => {
			const emoji = String.fromCodePoint(parseInt(codePoint, 10));
			return emojiToMarkdownMap.get(emoji) || emoji;
		});
	}
	else if (sourceFormat === TextFormat.Markdown && targetFormat === TextFormat.Unicode) {
		// Markdown → Unicode: Direct conversion
		regexPatterns.markdown.lastIndex = 0;
		return text.replace(regexPatterns.markdown, (match, shortcode) => {
			const emoji = markdownToEmojiMap.get(shortcode);
			if (emoji) {
				const codePoint = emoji.codePointAt(0);
				if (codePoint) {
					return `\\u{${codePoint.toString(16).toUpperCase()}}`;
				}
			}
			return match;
		});
	}
	else if (sourceFormat === TextFormat.Markdown && targetFormat === TextFormat.Html) {
		// Markdown → HTML: Direct conversion
		regexPatterns.markdown.lastIndex = 0;
		return text.replace(regexPatterns.markdown, (match, shortcode) => {
			const emoji = markdownToEmojiMap.get(shortcode);
			if (emoji) {
				const codePoint = emoji.codePointAt(0);
				if (codePoint) {
					return `&#${codePoint};`;
				}
			}
			return match;
		});
	}
	
	// Fall back to the multi-step conversion approach for mixed content
	// or when no direct conversion is available
	
	// Convert everything to emoji first
	let convertedText = convertUnicodeToEmojis(text);
	convertedText = convertHtmlEntitiesToEmojis(convertedText);
	convertedText = convertMarkdownToEmojis(convertedText);
	
	// If target is emoji, we're done
	if (targetFormat === TextFormat.Emoji) {
		return convertedText;
	}
	
	// Otherwise, convert emoji to the target format
	switch (targetFormat) {
		case TextFormat.Unicode:
			return convertEmojisToUnicode(convertedText);
		case TextFormat.Html:
			return convertEmojisToHtmlEntities(convertedText);
		case TextFormat.Markdown:
			return convertEmojisToMarkdown(convertedText);
		default:
			return convertedText;
	}
}

/**
 * Enum representing different text formats
 */
enum TextFormat {
	Unicode,
	Html,
	Markdown,
	Emoji,
	Mixed
}

/**
 * Detects the format of the given text
 * @param text The text to analyze
 * @returns The detected format or Mixed if multiple formats are found
 */
function detectTextFormat(text: string): TextFormat {
	// Optimize by using early returns for common cases
	
	// Reset all regex patterns to ensure consistent behavior
	Object.values(regexPatterns).forEach(pattern => {
		if (pattern.global) {
			pattern.lastIndex = 0;
		}
	});
	
	// Check for emoji characters first (common case)
	const hasEmoji = regexPatterns.emoji.test(text);
	
	// Only continue if no emoji is found or if we need to check for mixed content
	let formatCount = hasEmoji ? 1 : 0;
	
	// Perform more specific checks only on smaller samples for large texts
	const sampleText = text.length > 10000 ? text.substring(0, 5000) + text.substring(text.length - 5000) : text;
	
	// Check for Unicode escape sequences (common in code)
	const hasUnicode = regexPatterns.unicode.test(sampleText);
	if (hasUnicode) { formatCount++; }
	
	// If we already have mixed formats, return early
	if (formatCount > 1) {
		return TextFormat.Mixed;
	}
	
	// Check for HTML entities
	const hasHtml = regexPatterns.html.test(sampleText);
	if (hasHtml) { formatCount++; }
	
	// If we already have mixed formats, return early
	if (formatCount > 1) {
		return TextFormat.Mixed;
	}
	
	// Check for Markdown shortcodes
	const hasMarkdown = regexPatterns.markdown.test(sampleText);
	if (hasMarkdown) { formatCount++; }
	
	// If we have more than one format, it's mixed
	if (formatCount > 1) {
		return TextFormat.Mixed;
	}
	
	// Return the specific format found
	if (hasUnicode) { return TextFormat.Unicode; }
	if (hasHtml) { return TextFormat.Html; }
	if (hasMarkdown) { return TextFormat.Markdown; }
	if (hasEmoji) { return TextFormat.Emoji; }
	
	// Default to assuming it's plain text (treated as Emoji for conversion purposes)
	return TextFormat.Emoji;
}

/**
 * Converts emoji characters to Unicode escape sequences
 * @param text The text containing emoji characters
 * @returns Text with emojis converted to Unicode escape sequences
 */
export function convertEmojisToUnicode(text: string): string {
	// Cache for previously converted emojis to improve performance
	const cache: Map<string, string> = new Map();
	
	// Use cached regex pattern with the Emoji_Presentation and Extended_Pictographic Unicode properties
	// Reset lastIndex to ensure consistent behavior with multiple calls
	regexPatterns.emoji.lastIndex = 0;
	return text.replace(regexPatterns.emoji, (match) => {
		// Check cache first
		if (cache.has(match)) {
			return cache.get(match)!;
		}
		
		// Convert and cache the result
		const codePoint = match.codePointAt(0);
		if (codePoint) {
			const result = `\\u{${codePoint.toString(16).toUpperCase()}}`;
			cache.set(match, result);
			return result;
		}
		return match;
	});
}

/**
 * Converts Unicode escape sequences to emoji characters
 * @param text The text containing Unicode escape sequences
 * @returns Text with Unicode escape sequences converted to emojis
 */
export function convertUnicodeToEmojis(text: string): string {
	// Reset lastIndex to ensure consistent behavior with multiple calls
	regexPatterns.unicode.lastIndex = 0;
	// Match Unicode escape sequences in the format \u{XXXX}
	return text.replace(regexPatterns.unicode, (_, codePoint) => {
		return String.fromCodePoint(parseInt(codePoint, 16));
	});
}

/**
 * Converts emoji characters to HTML entities
 * @param text The text containing emoji characters
 * @returns Text with emojis converted to HTML entities
 */
export function convertEmojisToHtmlEntities(text: string): string {
	// Cache for previously converted emojis to improve performance
	const cache: Map<string, string> = new Map();
	
	// Reset lastIndex to ensure consistent behavior with multiple calls
	regexPatterns.emoji.lastIndex = 0;
	// Use cached regex pattern
	return text.replace(regexPatterns.emoji, (match) => {
		// Check cache first
		if (cache.has(match)) {
			return cache.get(match)!;
		}
		
		// Convert and cache the result
		const codePoint = match.codePointAt(0);
		if (codePoint) {
			const result = `&#${codePoint};`;
			cache.set(match, result);
			return result;
		}
		return match;
	});
}

/**
 * Converts HTML entities to emoji characters
 * @param text The text containing HTML entities
 * @returns Text with HTML entities converted to emojis
 */
export function convertHtmlEntitiesToEmojis(text: string): string {
	// Reset lastIndex to ensure consistent behavior with multiple calls
	regexPatterns.html.lastIndex = 0;
	// Match HTML decimal entities in the format &#XXXXX;
	return text.replace(regexPatterns.html, (_, codePoint) => {
		return String.fromCodePoint(parseInt(codePoint, 10));
	});
}

/**
 * Converts emoji characters to Markdown shortcodes
 * @param text The text containing emoji characters
 * @returns Text with emojis converted to Markdown shortcodes
 */
export function convertEmojisToMarkdown(text: string): string {
	// Reset lastIndex to ensure consistent behavior with multiple calls
	regexPatterns.emoji.lastIndex = 0;
	// For each emoji in the text, replace with its Markdown shortcode if available
	return text.replace(regexPatterns.emoji, (match) => {
		const shortcode = emojiToMarkdownMap.get(match);
		return shortcode || match;
	});
}

/**
 * Converts Markdown shortcodes to emoji characters
 * @param text The text containing Markdown shortcodes
 * @returns Text with Markdown shortcodes converted to emojis
 */
export function convertMarkdownToEmojis(text: string): string {
	// Reset lastIndex to ensure consistent behavior with multiple calls
	regexPatterns.markdown.lastIndex = 0;
	// Match Markdown shortcodes in the format :shortcode:
	return text.replace(regexPatterns.markdown, (match, shortcode) => {
		const emoji = markdownToEmojiMap.get(shortcode);
		return emoji || match;
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}
