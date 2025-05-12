const path = require('path');
const { runTests } = require('@vscode/test-electron');

async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        const extensionDevelopmentPath = path.resolve(__dirname, '../');
        // Use the new suite/index.js as the test entry point
        const extensionTestsPath = path.resolve(__dirname, './suite/index.js');

        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: ['--disable-extensions']
        });
    } catch (err) {
        console.error('Failed to run VS Code tests');
        process.exit(1);
    }
}

main();
