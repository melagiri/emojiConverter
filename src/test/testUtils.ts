// Helper function to wait for document edits to be applied
async function waitForDocumentEdit(document: vscode.TextDocument, expectedText: string | ((text: string) => boolean), timeout = 5000): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        // Get current text
        const currentText = document.getText();
        
        // Check if condition is met
        if (typeof expectedText === 'string') {
            if (currentText === expectedText) {
                return;
            }
        } else if (expectedText(currentText)) {
            return;
        }
        
        // Wait a bit before checking again
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error(`Edit was not applied within timeout (${timeout}ms)`);
}
