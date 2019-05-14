const assert = require('chai').assert;
const expect = require('chai').expect;
const jsYaml = require('js-yaml');
const fileImporter = require('./../../lib/file-import');

describe('File Importer - Verify File', () => {
  it('Ensure that given yaml file is found', async () => {
    let path = './test/resources/v3.0 examples/petstore.yaml';
    let result = fileImporter.verifyFile(path);
    expect(result).to.be.true;
  });

  it('Ensure that given file yml is found', async () => {
    let path = './test/resources/v3.0 examples/petstore.yaml';
    let result = fileImporter.verifyFile(path);
    expect(result).to.be.true;
  });

  it('Ensure that wrong file is not found', async () => {
    let path = './test/resources/v3.0 examples/FileNotFound.yaml';
    assert.throws(() => fileImporter.verifyFile(path));
  });
});

describe('File Importer - Import File', () => {
  it('Read given File as JSON', async () => {
    let path = './test/resources/v3.0 examples/petstore.yaml';
    let result = await fileImporter.importFile(path);
    expect(result).to.be.an('object');
    result = JSON.stringify(result);
    assert.doesNotThrow(() => jsYaml.safeDump(result));
    console.log(result);
  });
});