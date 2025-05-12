const vscode = {
    window: {
        showInformationMessage: (message) => {
            console.log(`Info: ${message}`);
        },
        showErrorMessage: (message) => {
            console.error(`Error: ${message}`);
        }
    },
    workspace: {
        getConfiguration: () => {
            return {
                get: (key) => {
                    return null; // Mock implementation
                }
            };
        }
    }
};

module.exports = vscode;