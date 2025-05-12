import * as vscode from 'vscode';
import { expect } from 'chai';
import {
  convertEmojisToUnicode,
  convertUnicodeToEmojis,
  convertEmojisToHtmlEntities,
  convertHtmlEntitiesToEmojis,
  convertEmojisToMarkdown,
  convertMarkdownToEmojis,
  composeConversions
} from '../src/conversion';

describe('Emoji Converter Extension Integration', function () {
  this.timeout(10000);
  let doc: vscode.TextDocument;
  let editor: vscode.TextEditor;

  beforeEach(async () => {
    doc = await vscode.workspace.openTextDocument({ content: '💬 :speech_balloon: &#128172; \\u{1F4AC} hello', language: 'plaintext' });
    editor = await vscode.window.showTextDocument(doc);
    await editor.edit(editBuilder => {
      editBuilder.replace(new vscode.Range(0, 0, doc.lineCount, 0), '💬 :speech_balloon: &#128172; \\u{1F4AC} hello');
    });
  });

  afterEach(async () => {
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  });

  it('should convert emojis to Unicode in the editor', async () => {
    await vscode.commands.executeCommand('emoji-converter.convertToUnicode');
    const text = doc.getText();
    expect(text).to.include('\\u{1F4AC}');
  });

  it('should convert emojis to HTML entities in the editor', async () => {
    await vscode.commands.executeCommand('emoji-converter.convertToHtmlEntities');
    const text = doc.getText();
    expect(text).to.include('&#128172;');
  });

  it('should convert emojis to Markdown in the editor', async () => {
    await vscode.commands.executeCommand('emoji-converter.convertEmojiToMarkdown');
    const text = doc.getText();
    expect(text).to.include(':speech_balloon:');
  });

  it('should convert all formats to emoji in the editor', async () => {
    await vscode.commands.executeCommand('emoji-converter.convertToEmoji');
    const text = doc.getText();
    expect(text).to.include('💬');
  });

  it('should show a warning if no active editor', async () => {
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
    // Should not throw
    await vscode.commands.executeCommand('emoji-converter.convertToUnicode');
  });

  it('should convert selection only', async () => {
    // Select only the emoji
    editor.selection = new vscode.Selection(doc.positionAt(0), doc.positionAt(2));
    await vscode.commands.executeCommand('emoji-converter.convertToHtmlEntities');
    const text = doc.getText();
    expect(text).to.include('&#128172;');
    expect(text).to.include(':speech_balloon:');
  });
});
