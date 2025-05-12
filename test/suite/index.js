"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
var path = require("path");
var Mocha = require("mocha");
function run() {
    // Create the mocha test instance
    var mocha = new Mocha({
        ui: 'bdd',
        color: true,
        timeout: 10000
    });
    var testFile = path.resolve(__dirname, '../../test/integration.test.js');
    mocha.addFile(testFile);
    return new Promise(function (resolve, reject) {
        try {
            mocha.run(function (failures) {
                if (failures > 0) {
                    reject(new Error("".concat(failures, " tests failed.")));
                }
                else {
                    resolve();
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
