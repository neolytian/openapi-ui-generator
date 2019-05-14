const assert = require('chai').assert;
const expect = require('chai').expect;
const fileImporter = require('./../../lib/file-import');

describe('File Importer - Verify File', () => {
  it('Ensure that given file is found', async () => {
    let path = './test/resources/v3.0 examples/petstore.yaml';
    let result = fileImporter.verifyFile(path);
    expect(result).to.be.true;
  });

  it('Ensure that wrong file is not found', async () => {
    let path = './test/resources/v3.0 examples/FileNotFound.yaml';
    assert.throws(() => fileImporter.verifyFile(path));
  });
});