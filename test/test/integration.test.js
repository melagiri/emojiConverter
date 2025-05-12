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
const vscode = __importStar(require("vscode"));
const chai_1 = require("chai");
describe('Emoji Converter Extension Integration', function () {
    this.timeout(10000);
    let doc;
    let editor;
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
        (0, chai_1.expect)(text).to.include('\\u{1F4AC}');
    });
    it('should convert emojis to HTML entities in the editor', async () => {
        await vscode.commands.executeCommand('emoji-converter.convertToHtmlEntities');
        const text = doc.getText();
        (0, chai_1.expect)(text).to.include('&#128172;');
    });
    it('should convert emojis to Markdown in the editor', async () => {
        await vscode.commands.executeCommand('emoji-converter.convertEmojiToMarkdown');
        const text = doc.getText();
        (0, chai_1.expect)(text).to.include(':speech_balloon:');
    });
    it('should convert all formats to emoji in the editor', async () => {
        await vscode.commands.executeCommand('emoji-converter.convertToEmoji');
        const text = doc.getText();
        (0, chai_1.expect)(text).to.include('💬');
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
        (0, chai_1.expect)(text).to.include('&#128172;');
        (0, chai_1.expect)(text).to.include(':speech_balloon:');
    });
});
//# sourceMappingURL=integration.test.js.map