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
    expect(result.pathExits).to.be.true;
    expect(result.allPathsHaveHttpVerb).to.be.true;
    expect(result.allPathsRefContent).to.be.true;
    // expect(result.allContentsRefSchema).to.be.true;
  });

  it('Ensure that given input json has no valid Open API Version', async () => {
    let path = './test/resources/parser/PetStoreOutput_No_API_Version.json';
    var jsonInput = fs.readFileSync(path, 'utf8');
    let result = await parser.verifyOpenApiFile(jsonInput);

    expect(result).to.be.an('object');
    expect(result.validOpenAPIVersion).to.be.false;
  });

  it('Ensure that given input json has no valid Servers', async () => {
    let path = './test/resources/parser/PetStoreOutput_Invalid_servers.json';
    var jsonInput = fs.readFileSync(path, 'utf8');
    let result = await parser.verifyOpenApiFile(jsonInput);

    expect(result).to.be.an('object');
    expect(result.serverExists).to.be.false;
  });

  it('Ensure that given input json has no paths', async () => {
    let path = './test/resources/parser/PetStoreOutput_No_Path.json';
    var jsonInput = fs.readFileSync(path, 'utf8');
    let result = await parser.verifyOpenApiFile(jsonInput);

    expect(result).to.be.an('object');
    expect(result.pathExits).to.be.false;
  });

  it('Ensure that given input json has paths without httpsVerbs', async () => {
    let path = './test/resources/parser/PetStoreOutput_No_HTTPVerb_in_path.json';
    var jsonInput = fs.readFileSync(path, 'utf8');
    let result = await parser.verifyOpenApiFile(jsonInput);

    expect(result).to.be.an('object');
    expect(result.allPathsHaveHttpVerb).to.be.false;
  });

  it('Ensure that given input json has no content', async () => {
    let path = './test/resources/parser/PetStoreOutput_Missing_Content.json';
    var jsonInput = fs.readFileSync(path, 'utf8');
    let result = await parser.verifyOpenApiFile(jsonInput);

    expect(result).to.be.an('object');
    expect(result.allPathsRefContent).to.be.false;
  });

  describe('Parser - Verify Open API Version', () => {
    it('Ensure that API Version is verified', () => {
      
    });

    it('Ensure that API Version is not verified', () => {
      
    });
  });

  describe('Parser - Verify Server Exists', () => {
    it('Ensure that Server Exists', () => {
      
    });

    it('<', () => {
      
    });
  });

  describe('Parser - Verify Paths Exist', () => {
    
  });

  describe('Parser - Verify Paths has HTTP Methods', () => {
    
  });

  describe('Parser - Verify Paths References Content', () => {
    
  });

  describe('Parser - Verify Content References Schema', () => {
    
  });

  describe('Parser - Extract Paths', () => {
    
  });

  describe('Parser - Extract Http Methods', () => {
    
  });

  describe('Parser - Extract Responses', () => {
    
  });

  describe('Parser - Extract Content', () => {
    
  });

  describe('Parser - Extract Schemas', () => {
    
  });

});