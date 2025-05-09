import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { convertEmojisToUnicode, convertUnicodeToEmojis } from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	// Test emoji to Unicode conversion
	test('Convert emoji to Unicode escape sequences', () => {
		const input = "This is a test with emoji 😊";
		const expected = "This is a test with emoji \\u{1F60A}";
		const result = convertEmojisToUnicode(input);
		assert.strictEqual(result, expected);
	});

	// Test Unicode to emoji conversion
	test('Convert Unicode escape sequences to emoji', () => {
		const input = "This is a test with Unicode \\u{1F60A}";
		const expected = "This is a test with Unicode 😊";
		const result = convertUnicodeToEmojis(input);
		assert.strictEqual(result, expected);
	});

	// Test multiple emoji conversions
	test('Convert multiple emojis to Unicode escape sequences', () => {
		const input = "Multiple emojis: 😊 👍 🚀";
		const expected = "Multiple emojis: \\u{1F60A} \\u{1F44D} \\u{1F680}";
		const result = convertEmojisToUnicode(input);
		assert.strictEqual(result, expected);
	});

	// Test multiple Unicode conversions
	test('Convert multiple Unicode escape sequences to emojis', () => {
		const input = "Multiple Unicode: \\u{1F60A} \\u{1F44D} \\u{1F680}";
		const expected = "Multiple Unicode: 😊 👍 🚀";
		const result = convertUnicodeToEmojis(input);
		assert.strictEqual(result, expected);
	});

	// Test round-trip conversion
	test('Round-trip conversion (emoji → Unicode → emoji)', () => {
		const original = "Round trip: 😊 👍 🚀";
		const toUnicode = convertEmojisToUnicode(original);
		const backToEmoji = convertUnicodeToEmojis(toUnicode);
		assert.strictEqual(backToEmoji, original);
	});

	// Test bidirectional conversion with mixed content
	test('Bidirectional conversion with mixed content', () => {
		const mixed = "Mixed content: 😊 and \\u{1F44D}";
		const allEmojis = convertUnicodeToEmojis(mixed);
		assert.strictEqual(allEmojis, "Mixed content: 😊 and 👍");
		
		const allUnicode = convertEmojisToUnicode(mixed);
		assert.strictEqual(allUnicode, "Mixed content: \\u{1F60A} and \\u{1F44D}");
	});
});

// Import test-specific modules

// Test fixtures path
const fixturesPath = path.join(__dirname, '../../../testFixtures');

// Create a helper function to create test files
async function createTestFile(filename: string, content: string): Promise<vscode.Uri> {
	// Ensure fixtures directory exists
	if (!fs.existsSync(fixturesPath)) {
		fs.mkdirSync(fixturesPath, { recursive: true });
	}
	
	const filePath = path.join(fixturesPath, filename);
	fs.writeFileSync(filePath, content, 'utf8');
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

// Integration tests for the extension commands
suite('Extension Integration Tests', () => {
	// Test files for editor operations
	let emojiTestUri: vscode.Uri;
	let unicodeTestUri: vscode.Uri;
	let mixedTestUri: vscode.Uri;
	
	suiteSetup(async () => {
		// Create test files for integration tests
		emojiTestUri = await createTestFile('emoji-test-integration.txt', 'This is an integration test with emojis 😊 👍 🚀');
		unicodeTestUri = await createTestFile('unicode-test-integration.txt', 'This is an integration test with Unicode \\u{1F60A} \\u{1F44D} \\u{1F680}');
		mixedTestUri = await createTestFile('mixed-test-integration.txt', 'This has both emojis 😊 and Unicode \\u{1F44D}');
	});

	suiteTeardown(() => {
		// Clean up test files
		try {
			fs.unlinkSync(path.join(fixturesPath, 'emoji-test-integration.txt'));
			fs.unlinkSync(path.join(fixturesPath, 'unicode-test-integration.txt'));
			fs.unlinkSync(path.join(fixturesPath, 'mixed-test-integration.txt'));
		} catch (error) {
			console.error('Error cleaning up test files:', error);
		}
	});

	// Test convertEmojisInEditor command
	test('Command: Convert Emojis to Unicode in Editor', async () => {
		// Open the test file
		const document = await vscode.workspace.openTextDocument(emojiTestUri);
		const editor = await vscode.window.showTextDocument(document);
		
		// Execute the command
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojisInEditor');
		
		// Check the result
		const text = editor.document.getText();
		assert.strictEqual(
			text.includes('\\u{1F60A}') && text.includes('\\u{1F44D}') && text.includes('\\u{1F680}'),
			true,
			'Text should contain Unicode escape sequences after conversion'
		);
	});

	// Test convertUnicodeInEditor command
	test('Command: Convert Unicode to Emojis in Editor', async () => {
		// Open the test file
		const document = await vscode.workspace.openTextDocument(unicodeTestUri);
		const editor = await vscode.window.showTextDocument(document);
		
		// Execute the command
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertUnicodeInEditor');
		
		// Check the result
		const text = editor.document.getText();
		assert.strictEqual(
			text.includes('😊') && text.includes('👍') && text.includes('🚀'),
			true,
			'Text should contain emojis after conversion'
		);
	});

	// Test toggleConversionInEditor command on a file with emojis
	test('Command: Toggle Conversion (Emoji to Unicode)', async () => {
		// Open the test file
		const document = await vscode.workspace.openTextDocument(emojiTestUri);
		const editor = await vscode.window.showTextDocument(document);
		
		// Execute the command
		await vscode.commands.executeCommand('emoji-to-unicode-converter.toggleConversionInEditor');
		
		// Check the result
		const text = editor.document.getText();
		assert.strictEqual(
			text.includes('\\u{1F60A}') && text.includes('\\u{1F44D}') && text.includes('\\u{1F680}'),
			true,
			'Text should contain Unicode escape sequences after toggling from emojis'
		);
	});

	// Test toggleConversionInEditor command on a file with Unicode
	test('Command: Toggle Conversion (Unicode to Emoji)', async () => {
		// Open the test file
		const document = await vscode.workspace.openTextDocument(unicodeTestUri);
		const editor = await vscode.window.showTextDocument(document);
		
		// Execute the command
		await vscode.commands.executeCommand('emoji-to-unicode-converter.toggleConversionInEditor');
		
		// Check the result
		const text = editor.document.getText();
		assert.strictEqual(
			text.includes('😊') && text.includes('👍') && text.includes('🚀'),
			true,
			'Text should contain emojis after toggling from Unicode'
		);
	});

	// Test bidirectional conversion on mixed content
	test('Command: Toggle Conversion on Mixed Content', async () => {
		// Open the test file
		const document = await vscode.workspace.openTextDocument(mixedTestUri);
		const editor = await vscode.window.showTextDocument(document);
		
		// Execute the command to convert to Unicode first
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertEmojisInEditor');
		
		// Check that emoji was converted to Unicode
		let text = editor.document.getText();
		assert.strictEqual(
			text.includes('\\u{1F60A}') && text.includes('\\u{1F44D}'),
			true,
			'Text should contain Unicode escape sequences after emoji conversion'
		);
		
		// Now convert Unicode to emoji
		await vscode.commands.executeCommand('emoji-to-unicode-converter.convertUnicodeInEditor');
		
		// Check that Unicode was converted to emoji
		text = editor.document.getText();
		assert.strictEqual(
			text.includes('😊') && text.includes('👍'),
			true,
			'Text should contain emojis after Unicode conversion'
		);
	});
});
