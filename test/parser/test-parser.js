// const assert = require('chai').assert;
const expect = require('chai').expect;
const fs = require('fs');
const parser = require('./../../lib/parser');

describe('Parser - Verify Open API Content', () => {
  it('Ensure that given input json is valid', async () => {
    let path = './test/resources/parser/PetStoreOutput.json';
    var jsonInput = fs.readFileSync(path, 'utf8');
    let result = await parser.verifyOpenApiFile(jsonInput);

    expect(result).to.be.an('object');
    expect(result.validOpenAPIVersion).to.be.true;
    expect(result.serverExists).to.be.true;
    //expect(result.pathExits).to.be.true;
    //expect(result.allPathsHaveHttpVerb).to.be.true;
    //expect(result.allContentsRefSchema).to.be.true;
  });

  it('Ensure that given input json has no valid Open API Version', async () => {
    let path = './test/resources/parser/PetStoreOutput_No_API_Version.json';
    var jsonInput = fs.readFileSync(path, 'utf8');
    let result = await parser.verifyOpenApiFile(jsonInput);

    expect(result).to.be.an('object');
    expect(result.validOpenAPIVersion).to.be.false;
  });
});

describe('File Importer - Import File', () => {

});