import { expect } from 'chai';
import * as sinon from 'sinon';
import { VSCodeMock } from '../vscode-mock';

// Mock VS Code API
const vscode = new VSCodeMock();

// Import after mocking vscode
import { 
  convertEmojisToUnicodeInEditor,
  convertEmojisToHtmlInEditor,
  convertEmojisToMarkdownInEditor,
  convertAllToEmojisInEditor
} from '../../extension';

suite('Editor Function Tests', () => {
  let sandbox: sinon.SinonSandbox;
  
  setup(() => {
    sandbox = sinon.createSandbox();
  });
  
  teardown(() => {
    sandbox.restore();
  });
  
  test('convertEmojisToUnicodeInEditor should convert emojis to Unicode in active editor', async () => {
    // Create a mock editor with emoji text
    const editor = vscode.createMockEditor('😀 Hello World 🌍');
    
    // Call the function
    await convertEmojisToUnicodeInEditor(editor as any);
    
    // Verify that edit was called
    expect(editor.edit.called).to.be.true;
    
    // Verify that showInformationMessage was called
    expect(vscode.window.showInformationMessage.called).to.be.true;
  });
  
  test('convertEmojisToHtmlInEditor should convert emojis to HTML in active editor', async () => {
    // Create a mock editor with emoji text
    const editor = vscode.createMockEditor('😀 Hello World 🌍');
    
    // Call the function
    await convertEmojisToHtmlInEditor(editor as any);
    
    // Verify that edit was called
    expect(editor.edit.called).to.be.true;
    
    // Verify that showInformationMessage was called
    expect(vscode.window.showInformationMessage.called).to.be.true;
  });
  
  test('convertEmojisToMarkdownInEditor should convert emojis to Markdown in active editor', async () => {
    // Create a mock editor with emoji text
    const editor = vscode.createMockEditor('😀 Hello World 🌍');
    
    // Call the function
    await convertEmojisToMarkdownInEditor(editor as any);
    
    // Verify that edit was called
    expect(editor.edit.called).to.be.true;
    
    // Verify that showInformationMessage was called
    expect(vscode.window.showInformationMessage.called).to.be.true;
  });
  
  test('convertAllToEmojisInEditor should convert various formats to emojis in active editor', async () => {
    // Create a mock editor with text containing various formats
    const editor = vscode.createMockEditor('\\u{1F600} &#127757; :rocket:');
    
    // Call the function
    await convertAllToEmojisInEditor(editor as any);
    
    // Verify that edit was called
    expect(editor.edit.called).to.be.true;
    
    // Verify that showInformationMessage was called
    expect(vscode.window.showInformationMessage.called).to.be.true;
  });
  
  test('Editor functions should handle selected text differently than full document', async () => {
    // Create a mock editor with a selection
    const editor = vscode.createMockEditor('Before 😀 Selected 🌍 After', 7, 19);
    
    // Call the function
    await convertEmojisToUnicodeInEditor(editor as any);
    
    // Verify that edit was called
    expect(editor.edit.called).to.be.true;
    
    // Selection should have different behavior than full document
    // For selected text, document.getText(selection) will be called
    expect(editor.document.getText.calledWith(sinon.match.any)).to.be.true;
  });
});
