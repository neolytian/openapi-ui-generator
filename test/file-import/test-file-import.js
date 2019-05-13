const assert = require('chai').assert;
const expect = require('chai').expect;
const fileImporter = require('./../../lib/file-import');

describe('File Importer', () => {
  it('Ensure that given file is found', async () => {
    let path = './test/resources/v3.0 examples/petstore.yaml';
    let result = await fileImporter.verifyFile(path);
    expect(result).to.be.true;
  });

  it('Ensure that wrong file to be rejected', async () => {
    let path = './test/resources/v3.0 examples/FileNotFound.yaml';
    await assert.throws(
       async () => {
         await fileImporter.verifyFile(path);
       }
    );
  });
});