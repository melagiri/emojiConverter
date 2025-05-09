import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { convertEmojisToUnicode } from '../extension'; // You'll need to export this function
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
// Import test-specific modules

// Test fixtures path
const fixturesPath = path.join(__dirname, '../../testFixtures');

// Create a helper function to create test files
async function createTestFile(filename: string, content: string): Promise<vscode.Uri> {
	// Ensure fixtures directory exists
	if (!fs.existsSync(fixturesPath)) {
		fs.mkdirSync(fixturesPath, { recursive: true });
	}
	
	const filePath = path.join(fixturesPath, filename);
	fs.writeFileSync(filePath, content);
	return vscode.Uri.file(filePath);
}

// Helper to clean up test files
function cleanupTestFiles() {
	if (fs.existsSync(fixturesPath)) {
		fs.rmSync(fixturesPath, { recursive: true, force: true });
	}
}

suite('Emoji to Unicode Converter Extension Tests', () => {
	vscode.window.showInformationMessage('Starting emoji converter tests');
	
	// Cleanup after tests
	teardown(cleanupTestFiles);
	
	// Direct function test
	test('convertEmojisToUnicode - converts emojis to unicode escape sequences', () => {
		assert.strictEqual(convertEmojisToUnicode('Hello 👋'), 'Hello \\u{1F44B}');
		assert.strictEqual(convertEmojisToUnicode('No emoji here'), 'No emoji here');
		assert.strictEqual(convertEmojisToUnicode('Multiple 🎉🎊 emojis'), 'Multiple \\u{1F389}\\u{1F38A} emojis');
		assert.strictEqual(convertEmojisToUnicode('😀😃😄'), '\\u{1F600}\\u{1F603}\\u{1F604}');
	});
	
	// Test with different language files
	test('JavaScript file with emojis', async () => {
		const fileUri = await createTestFile('test.js', 'console.log("Hello 👋");');
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(document.getText(), 'console.log("Hello \\u{1F44B}");');
	});
	
	test('Python file with emojis', async () => {
		const fileUri = await createTestFile('test.py', 'print("Python loves 🐍")');
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(document.getText(), 'print("Python loves \\u{1F40D}")');
	});
	
	test('Ruby file with emojis', async () => {
		const fileUri = await createTestFile('test.rb', 'puts "Ruby 💎"');
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(document.getText(), 'puts "Ruby \\u{1F48E}"');
	});
	
	test('Java file with emojis', async () => {
		const fileUri = await createTestFile('test.java', 'System.out.println("Java ☕");');
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(document.getText(), 'System.out.println("Java \\u{2615}");');
	});
	
	test('C# file with emojis', async () => {
		const fileUri = await createTestFile('test.cs', 'Console.WriteLine("C# 🔥");');
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(document.getText(), 'Console.WriteLine("C# \\u{1F525}");');
	});
	
	test('Go file with emojis', async () => {
		const fileUri = await createTestFile('test.go', 'fmt.Println("Go 🏃")');
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(document.getText(), 'fmt.Println("Go \\u{1F3C3}")');
	});
	
	test('Swift file with emojis', async () => {
		const fileUri = await createTestFile('test.swift', 'print("Swift 🦅")');
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(document.getText(), 'print("Swift \\u{1F985}")');
	});
	
	// Edge cases
	test('File with multiple emojis', async () => {
		const fileUri = await createTestFile('test.txt', 'Many emojis 😀😃😄😁😆😅🤣😂');
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(
			document.getText(), 
			'Many emojis \\u{1F600}\\u{1F603}\\u{1F604}\\u{1F601}\\u{1F606}\\u{1F605}\\u{1F923}\\u{1F602}'
		);
	});
	
	test('File with no emojis', async () => {
		const originalText = 'No emojis here';
		const fileUri = await createTestFile('test.txt', originalText);
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);
		
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojis');
		
		assert.strictEqual(document.getText(), originalText);
	});
});
