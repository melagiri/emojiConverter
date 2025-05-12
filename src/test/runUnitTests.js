const Mocha = require('mocha');
const glob = require('glob');
const path = require('path');

// Create a new mocha test runner
const mocha = new Mocha({
    ui: 'tdd',
    color: true
});

// Get the current directory
const testsRoot = __dirname;

// Find all test files
const testFiles = glob.sync('**/*.test.js', { cwd: testsRoot });

// Add test files to mocha
testFiles.forEach(file => {
    // Skip extension.test.js which requires VS Code API
    if (file !== 'suite/extension.test.js' && file !== 'suite/editor.test.js') {
        mocha.addFile(path.resolve(testsRoot, file));
    }
});

// Run the tests
mocha.run(failures => {
    process.exitCode = failures ? 1 : 0;
});
