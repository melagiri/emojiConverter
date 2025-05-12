import * as path from 'path';
import * as Mocha from 'mocha';

export function run(): Promise<void> {
  // Create the mocha test instance
  const mocha = new Mocha({
    ui: 'bdd',
    color: true,
    timeout: 10000
  });

  const testFile = path.resolve(__dirname, '../../test/integration.test.js');
  mocha.addFile(testFile);

  return new Promise((resolve, reject) => {
    try {
      mocha.run(failures => {
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
