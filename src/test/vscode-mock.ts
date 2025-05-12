import * as sinon from 'sinon';

/**
 * Mock VS Code API for unit tests
 */
export class VSCodeMock {
  window: any;
  commands: any;
  workspace: any;
  Uri: any;
  Range: any;
  Position: any;
  Selection: any;
  StatusBarAlignment: any;
  ExtensionContext: any;
  
  constructor() {
    // Mock vscode.window
    this.window = {
      showInformationMessage: sinon.stub().resolves(),
      showWarningMessage: sinon.stub().resolves(),
      showErrorMessage: sinon.stub().resolves(),
      showQuickPick: sinon.stub().resolves(),
      showTextDocument: sinon.stub().resolves({
        edit: sinon.stub().resolves(true),
        document: null,
        selection: null
      }),
      activeTextEditor: null,
      withProgress: sinon.stub().callsFake((options, task) => {
        return task({
          report: sinon.stub()
        }, { isCancellationRequested: false });
      })
    };
    
    // Mock vscode.commands
    this.commands = {
      registerCommand: sinon.stub().returns({ dispose: sinon.stub() }),
      executeCommand: sinon.stub().resolves()
    };
    
    // Mock vscode.workspace
    this.workspace = {
      openTextDocument: sinon.stub().resolves({
        getText: sinon.stub().returns(''),
        positionAt: sinon.stub().returns({ line: 0, character: 0 }),
        lineAt: sinon.stub().returns({ text: '', range: {} }),
        getWordRangeAtPosition: sinon.stub().returns({ start: {}, end: {} }),
        save: sinon.stub().resolves(true)
      })
    };
    
    // Mock vscode.Uri
    this.Uri = {
      file: sinon.stub().returns({}),
      parse: sinon.stub().returns({})
    };
    
    // Mock vscode.Range
    this.Range = sinon.stub().returns({});
    
    // Mock vscode.Position
    this.Position = sinon.stub().returns({});
    
    // Mock vscode.Selection
    this.Selection = sinon.stub().returns({
      isEmpty: true,
      start: { line: 0, character: 0 },
      end: { line: 0, character: 0 }
    });
    
    // Mock ProgressLocation
    this.ProgressLocation = {
      Notification: 1
    };
    
    // Mock StatusBarAlignment
    this.StatusBarAlignment = {
      Left: 1,
      Right: 2
    };
    
    // Mock ExtensionContext
    this.ExtensionContext = {
      subscriptions: []
    };
  }
  
  /**
   * Creates a mock editor state for testing
   * @param documentText Text to include in the document
   * @param selectionStart Start position of selection
   * @param selectionEnd End position of selection
   * @returns Mock editor object
   */
  createMockEditor(documentText: string, selectionStart?: number, selectionEnd?: number) {
    const document = {
      getText: sinon.stub().returns(documentText),
      positionAt: sinon.stub().callsFake((offset: number) => {
        return { line: 0, character: offset };
      }),
      lineAt: sinon.stub().returns({ text: documentText, range: {} }),
      getWordRangeAtPosition: sinon.stub().returns({ start: {}, end: {} }),
      save: sinon.stub().resolves(true)
    };
    
    let selection;
    if (selectionStart !== undefined && selectionEnd !== undefined) {
      selection = {
        isEmpty: false,
        start: { line: 0, character: selectionStart },
        end: { line: 0, character: selectionEnd }
      };
      
      document.getText = sinon.stub().callsFake((range?: any) => {
        if (range) {
          return documentText.substring(selectionStart, selectionEnd);
        }
        return documentText;
      });
    } else {
      selection = {
        isEmpty: true,
        start: { line: 0, character: 0 },
        end: { line: 0, character: 0 }
      };
    }
    
    const editor = {
      document,
      selection,
      edit: sinon.stub().callsFake((callback: Function) => {
        callback({
          replace: sinon.stub().returns(true),
          insert: sinon.stub().returns(true),
          delete: sinon.stub().returns(true)
        });
        return Promise.resolve(true);
      })
    };
    
    this.window.activeTextEditor = editor;
    
    return editor;
  }
}
