import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { expect } from 'chai';

// This context is for VS Code extension activation
suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Starting all tests.');

  test('Extension should be activated', async () => {
    const extension = vscode.extensions.getExtension('melagiri.emoji-converter');
    assert.ok(extension);
    
    if (!extension?.isActive) {
      await extension?.activate();
    }
    
    assert.ok(extension?.isActive);
  });

  test('Commands should be registered', async () => {
    const commands = await vscode.commands.getCommands();
    
    assert.ok(commands.includes('emoji-converter.quickFormatSelection'));
    assert.ok(commands.includes('emoji-converter.convertToUnicode'));
    assert.ok(commands.includes('emoji-converter.convertToHtmlEntities'));
    assert.ok(commands.includes('emoji-converter.convertEmojiToMarkdown'));
    assert.ok(commands.includes('emoji-converter.convertToEmoji'));
  });
});

suite('Editor Integration Tests', () => {
  let document: vscode.TextDocument;
  let editor: vscode.TextEditor;
  
  setup(async () => {
    // Create a temporary document
    document = await vscode.workspace.openTextDocument({
      content: '😀 Hello World 🌍',
      language: 'plaintext'
    });
    
    // Open the document in an editor
    editor = await vscode.window.showTextDocument(document);
  });
  
  teardown(async () => {
    // Close the document without saving
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  });

  // Note: These tests might be flaky in automated environments
  // as they depend on real VS Code instance and editor state
  
  test('Command "convertToUnicode" should convert emojis to Unicode in editor', async function() {
    this.timeout(10000); // Extend timeout for UI operations

    // Create spy on showInformationMessage to check if it's called
    const spy = sinon.spy(vscode.window, 'showInformationMessage');
    
    try {
      // Execute the command
      await vscode.commands.executeCommand('emoji-converter.convertToUnicode');
      
      // Wait a bit for the edit to be applied
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the text from the editor
      const text = document.getText();
      
      // Check if the message was shown (which indicates command ran)
      sinon.assert.called(spy);
      
      // Verify the conversion (using includes instead of exact match for robustness)
      expect(text.includes('\\u{1F600}')).to.be.true;
      expect(text.includes('\\u{1F30D}')).to.be.true;
    } finally {
      // Restore the spy
      spy.restore();
    }
  });
  
  test('Command "convertToHtmlEntities" should convert emojis to HTML entities in editor', async function() {
    this.timeout(10000); // Extend timeout for UI operations
    
    // Create spy on showInformationMessage to check if it's called
    const spy = sinon.spy(vscode.window, 'showInformationMessage');
    
    try {
      // Execute the command
      await vscode.commands.executeCommand('emoji-converter.convertToHtmlEntities');
      
      // Wait a bit for the edit to be applied
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the text from the editor
      const text = document.getText();
      
      // Check if the message was shown (which indicates command ran)
      sinon.assert.called(spy);
      
      // Verify the conversion
      expect(text.includes('&#128512;')).to.be.true;
      expect(text.includes('&#127757;')).to.be.true;
    } finally {
      // Restore the spy
      spy.restore();
    }
  });
});
