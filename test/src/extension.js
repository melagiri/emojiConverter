"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const conversion_1 = require("./conversion");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
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
        }
        else {
            vscode.window.showWarningMessage('No active editor found');
        }
    });
    // Register the command to convert to HTML entities (Ctrl+Alt+H)
    const convertToHtmlCommand = vscode.commands.registerCommand('emoji-converter.convertToHtmlEntities', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            convertToHtmlInEditor(editor);
            vscode.window.showInformationMessage('Converted to HTML entities');
        }
        else {
            vscode.window.showWarningMessage('No active editor found');
        }
    });
    // Register the command to convert to Markdown shortcodes (Ctrl+Alt+M)
    const convertEmojiToMarkdownCommand = vscode.commands.registerCommand('emoji-converter.convertEmojiToMarkdown', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            convertToMarkdownInEditor(editor);
            vscode.window.showInformationMessage('Converted to Markdown shortcodes');
        }
        else {
            vscode.window.showWarningMessage('No active editor found');
        }
    });
    // Register the command to convert Unicode/HTML/Markdown to emojis (Ctrl+Alt+E)
    const convertToEmojiCommand = vscode.commands.registerCommand('emoji-converter.convertToEmoji', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            convertAllToEmojisInEditor(editor);
            vscode.window.showInformationMessage('Converted to emojis');
        }
        else {
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
function applyConversionInEditor(editor, conversionFn, progressMessage) {
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
                        const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
                        await editor.edit(editBuilder => {
                            editBuilder.replace(fullRange, convertedText);
                        });
                    }
                    else {
                        vscode.window.showInformationMessage('No changes were made to the document');
                    }
                }
                else {
                    // For smaller documents, process all at once
                    const convertedText = conversionFn(text);
                    // If text was changed, replace the entire document content
                    if (convertedText !== text) {
                        const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
                        await editor.edit(editBuilder => {
                            editBuilder.replace(fullRange, convertedText);
                        });
                    }
                    else {
                        vscode.window.showInformationMessage('No changes were made to the document');
                    }
                }
            }
            catch (error) {
                vscode.window.showErrorMessage(`Error during conversion: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    else {
        // There is a selection, only process that text
        try {
            const text = document.getText(selection);
            const convertedText = conversionFn(text);
            // If text was changed, replace only the selected content
            if (convertedText !== text) {
                return editor.edit(editBuilder => {
                    editBuilder.replace(selection, convertedText);
                });
            }
            else {
                vscode.window.showInformationMessage('No changes were made to the selection');
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error during conversion: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
/**
 * Converts all emojis in the given text editor to Unicode escape sequences
 * @param editor The active text editor
 */
function convertEmojisToUnicodeInEditor(editor) {
    applyConversionInEditor(editor, conversion_1.convertEmojisToUnicode, 'Converting emojis to Unicode escape sequences...');
}
/**
 * Converts Unicode escape sequences in the given text editor to emoji characters
 * @param editor The active text editor
 */
function convertUnicodeToEmojisInEditor(editor) {
    applyConversionInEditor(editor, conversion_1.convertUnicodeToEmojis, 'Converting Unicode escape sequences to emojis...');
}
/**
 * Converts all emojis in the given text editor to HTML entities
 * @param editor The active text editor
 */
function convertEmojisToHtmlInEditor(editor) {
    applyConversionInEditor(editor, conversion_1.convertEmojisToHtmlEntities, 'Converting emojis to HTML entities...');
}
/**
 * Converts HTML entities in the given text editor to emoji characters
 * @param editor The active text editor
 */
function convertHtmlToEmojisInEditor(editor) {
    applyConversionInEditor(editor, conversion_1.convertHtmlEntitiesToEmojis, 'Converting HTML entities to emojis...');
}
/**
 * Converts all emojis in the given text editor to Markdown shortcodes
 * @param editor The active text editor
 */
function convertEmojisToMarkdownInEditor(editor) {
    applyConversionInEditor(editor, conversion_1.convertEmojisToMarkdown, 'Converting emojis to Markdown shortcodes...');
}
/**
 * Converts Markdown shortcodes in the given text editor to emoji characters
 * @param editor The active text editor
 */
function convertMarkdownToEmojisInEditor(editor) {
    applyConversionInEditor(editor, conversion_1.convertMarkdownToEmojis, 'Converting Markdown shortcodes to emojis...');
}
/**
 * Attempts to convert any supported format to emoji characters
 * @param editor The active text editor
 */
function convertAllToEmojisInEditor(editor) {
    applyConversionInEditor(editor, 
    // Use composition for more efficient conversions
    (0, conversion_1.composeConversions)(conversion_1.convertUnicodeToEmojis, conversion_1.convertHtmlEntitiesToEmojis, conversion_1.convertMarkdownToEmojis), 'Converting to emojis...');
}
/**
 * Converts any format to Unicode escape sequences
 * First converts any format to emojis, then converts emojis to Unicode
 * @param editor The active text editor
 */
function convertToUnicodeInEditor(editor) {
    applyConversionInEditor(editor, 
    // Use composition for more efficient conversions
    (0, conversion_1.composeConversions)(conversion_1.convertUnicodeToEmojis, conversion_1.convertHtmlEntitiesToEmojis, conversion_1.convertMarkdownToEmojis, conversion_1.convertEmojisToUnicode), 'Converting to Unicode escape sequences...');
}
/**
 * Converts any format to HTML entities
 * First converts any format to emojis, then converts emojis to HTML entities
 * @param editor The active text editor
 */
function convertToHtmlInEditor(editor) {
    applyConversionInEditor(editor, 
    // Use composition for more efficient conversions
    (0, conversion_1.composeConversions)(conversion_1.convertUnicodeToEmojis, conversion_1.convertHtmlEntitiesToEmojis, conversion_1.convertMarkdownToEmojis, conversion_1.convertEmojisToHtmlEntities), 'Converting to HTML entities...');
}
/**
 * Converts any format to Markdown shortcodes
 * First converts any format to emojis, then converts emojis to Markdown shortcodes
 * @param editor The active text editor
 */
function convertToMarkdownInEditor(editor) {
    applyConversionInEditor(editor, 
    // Use composition for more efficient conversions
    (0, conversion_1.composeConversions)(conversion_1.convertUnicodeToEmojis, conversion_1.convertHtmlEntitiesToEmojis, conversion_1.convertMarkdownToEmojis, conversion_1.convertEmojisToMarkdown), 'Converting to Markdown shortcodes...');
}
/**
 * Converts text from one format to another based on source and target formats
 * @param text The text to convert
 * @param targetFormat The desired output format
 * @returns The converted text
 */
function smartConvert(text, targetFormat) {
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
            case TextFormat.Unicode: return (0, conversion_1.convertEmojisToUnicode)(text);
            case TextFormat.Html: return (0, conversion_1.convertEmojisToHtmlEntities)(text);
            case TextFormat.Markdown: return (0, conversion_1.convertEmojisToMarkdown)(text);
            default: return text;
        }
    }
    // Direct format-to-format conversions to avoid unnecessary intermediate steps
    // These direct conversions improve performance by avoiding the emoji step
    const conversionKey = `${sourceFormat}_${targetFormat}`;
    if (sourceFormat === TextFormat.Unicode && targetFormat === TextFormat.Html) {
        // Unicode → HTML: Direct conversion without going through emoji
        conversion_1.regexPatterns.unicode.lastIndex = 0;
        return text.replace(conversion_1.regexPatterns.unicode, (_, codePoint) => `&#${parseInt(codePoint, 16)};`);
    }
    else if (sourceFormat === TextFormat.Unicode && targetFormat === TextFormat.Markdown) {
        // Unicode → Markdown: Direct conversion
        conversion_1.regexPatterns.unicode.lastIndex = 0;
        return text.replace(conversion_1.regexPatterns.unicode, (_, codePoint) => {
            const emoji = String.fromCodePoint(parseInt(codePoint, 16));
            return conversion_1.emojiToMarkdownMap.get(emoji) || emoji;
        });
    }
    else if (sourceFormat === TextFormat.Html && targetFormat === TextFormat.Unicode) {
        // HTML → Unicode: Direct conversion
        conversion_1.regexPatterns.html.lastIndex = 0;
        return text.replace(conversion_1.regexPatterns.html, (_, codePoint) => `\\u{${parseInt(codePoint, 10).toString(16).toUpperCase()}}`);
    }
    else if (sourceFormat === TextFormat.Html && targetFormat === TextFormat.Markdown) {
        // HTML → Markdown: Direct conversion
        conversion_1.regexPatterns.html.lastIndex = 0;
        return text.replace(conversion_1.regexPatterns.html, (_, codePoint) => {
            const emoji = String.fromCodePoint(parseInt(codePoint, 10));
            return conversion_1.emojiToMarkdownMap.get(emoji) || emoji;
        });
    }
    else if (sourceFormat === TextFormat.Markdown && targetFormat === TextFormat.Unicode) {
        // Markdown → Unicode: Direct conversion
        conversion_1.regexPatterns.markdown.lastIndex = 0;
        return text.replace(conversion_1.regexPatterns.markdown, (match, shortcode) => {
            const emoji = conversion_1.markdownToEmojiMap.get(shortcode);
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
        conversion_1.regexPatterns.markdown.lastIndex = 0;
        return text.replace(conversion_1.regexPatterns.markdown, (match, shortcode) => {
            const emoji = conversion_1.markdownToEmojiMap.get(shortcode);
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
    let convertedText = (0, conversion_1.convertUnicodeToEmojis)(text);
    convertedText = (0, conversion_1.convertHtmlEntitiesToEmojis)(convertedText);
    convertedText = (0, conversion_1.convertMarkdownToEmojis)(convertedText);
    // If target is emoji, we're done
    if (targetFormat === TextFormat.Emoji) {
        return convertedText;
    }
    // Otherwise, convert emoji to the target format
    switch (targetFormat) {
        case TextFormat.Unicode:
            return (0, conversion_1.convertEmojisToUnicode)(convertedText);
        case TextFormat.Html:
            return (0, conversion_1.convertEmojisToHtmlEntities)(convertedText);
        case TextFormat.Markdown:
            return (0, conversion_1.convertEmojisToMarkdown)(convertedText);
        default:
            return convertedText;
    }
}
/**
 * Enum representing different text formats
 */
var TextFormat;
(function (TextFormat) {
    TextFormat[TextFormat["Unicode"] = 0] = "Unicode";
    TextFormat[TextFormat["Html"] = 1] = "Html";
    TextFormat[TextFormat["Markdown"] = 2] = "Markdown";
    TextFormat[TextFormat["Emoji"] = 3] = "Emoji";
    TextFormat[TextFormat["Mixed"] = 4] = "Mixed";
})(TextFormat || (TextFormat = {}));
/**
 * Detects the format of the given text
 * @param text The text to analyze
 * @returns The detected format or Mixed if multiple formats are found
 */
function detectTextFormat(text) {
    // Optimize by using early returns for common cases
    // Reset all regex patterns to ensure consistent behavior
    Object.values(conversion_1.regexPatterns).forEach(pattern => {
        if (pattern.global) {
            pattern.lastIndex = 0;
        }
    });
    // Check for emoji characters first (common case)
    const hasEmoji = conversion_1.regexPatterns.emoji.test(text);
    // Only continue if no emoji is found or if we need to check for mixed content
    let formatCount = hasEmoji ? 1 : 0;
    // Perform more specific checks only on smaller samples for large texts
    const sampleText = text.length > 10000 ? text.substring(0, 5000) + text.substring(text.length - 5000) : text;
    // Check for Unicode escape sequences (common in code)
    const hasUnicode = conversion_1.regexPatterns.unicode.test(sampleText);
    if (hasUnicode) {
        formatCount++;
    }
    // If we already have mixed formats, return early
    if (formatCount > 1) {
        return TextFormat.Mixed;
    }
    // Check for HTML entities
    const hasHtml = conversion_1.regexPatterns.html.test(sampleText);
    if (hasHtml) {
        formatCount++;
    }
    // If we already have mixed formats, return early
    if (formatCount > 1) {
        return TextFormat.Mixed;
    }
    // Check for Markdown shortcodes
    const hasMarkdown = conversion_1.regexPatterns.markdown.test(sampleText);
    if (hasMarkdown) {
        formatCount++;
    }
    // If we have more than one format, it's mixed
    if (formatCount > 1) {
        return TextFormat.Mixed;
    }
    // Return the specific format found
    if (hasUnicode) {
        return TextFormat.Unicode;
    }
    if (hasHtml) {
        return TextFormat.Html;
    }
    if (hasMarkdown) {
        return TextFormat.Markdown;
    }
    if (hasEmoji) {
        return TextFormat.Emoji;
    }
    // Default to assuming it's plain text (treated as Emoji for conversion purposes)
    return TextFormat.Emoji;
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map