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
    it('Ensure that API Version is verified', async () => {
      let path = './test/resources/parser/PetStoreOutput.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyOpenApiVersion(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.true;
    });

    it('Ensure that API Version is not verified', async () => {
      let path = './test/resources/parser/PetStoreOutput_No_API_Version.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyOpenApiVersion(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.false;
    });
  });

  describe('Parser - Verify Server Exists', () => {
    it('Ensure that Server Exists', async () => {
      let path = './test/resources/parser/PetStoreOutput.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyIfServerExist(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.true;
    });

    it('Ensure that Server is missing', async () => {
      let path = './test/resources/parser/PetStoreOutput_Invalid_servers.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyIfServerExist(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.false;
    });
  });

  describe('Parser - Verify Paths Exist', () => {
    it('ensure that paths exists', async () => {
      let path = './test/resources/parser/PetStoreOutput.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyIfPathsExist(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.true;
    });
    it('ensure that paths does not exists', async () => {
      let path = './test/resources/parser/PetStoreOutput_No_Path.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyIfPathsExist(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.false;
    });
  });

  describe('Parser - Verify Paths has HTTP Methods', () => {
    it('ensure that found paths have ', async () => {
      let path = './test/resources/parser/PetStoreOutput.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyIfPathHasHttpVerb(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.true;
    });
    it('ensure that no found paths have ', async () => {
      let path = './test/resources/parser/PetStoreOutput_No_HTTPVerb_in_path.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyIfPathHasHttpVerb(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.false;
    });
  });

  describe('Parser - Verify Paths References Content', () => {
    it('ensure that found paths have content ', async () => {
      let path = './test/resources/parser/PetStoreOutput.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyIfPathReferencesContent(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.true;
    });
    it('ensure that found paths have no content ', async () => {
      let path = './test/resources/parser/PetStoreOutput_Missing_Content.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let result = await parser.verifyIfPathReferencesContent(jsonInput);

      expect(result).to.be.a('boolean');
      expect(result).to.be.false;
    });
  });

  describe('Parser - Verify Content References Schema', () => {
    it('ensure that found content has schema ', () => {

    });
    it('ensure that found content has no schema ', () => {

    });
  });

  describe('Parser - Extract Paths', () => {
    it('should have found 2 paths', async () => {
      let path = './test/resources/parser/PetStoreOutput.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let pathkeys = await parser.extractPaths(jsonInput);

      expect(pathkeys).to.be.an('array');
      expect(pathkeys.length).to.equal(2);
      expect(pathkeys.includes('/pets')).to.be.true;
      expect(pathkeys.includes('/pets/{petId}')).to.be.true;
      pathkeys.map(path => {
        expect(path).to.be.a('string');
        expect(path).to.not.be.an('undefined');
      });
    });

    it('should have found no paths', async () => {
      let path = './test/resources/parser/PetStoreOutput_No_Path.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      let pathkeys = await parser.extractPaths(jsonInput);

      expect(pathkeys).to.be.an('array');
      expect(pathkeys.length).to.equal(0);
    });
  });

  describe('Parser - Extract Http Methods', () => {
    it('should have found Http Methods', async () => {
      let path = './test/resources/parser/PetStoreOutput.json';
      var jsonInput = fs.readFileSync(path, 'utf8');
      var pathkeys = ['/pets', '/pets/{petId}'];
      var httpMethods = await parser.extractHttpMethods(pathkeys, jsonInput);

      expect(httpMethods).to.be.an('array');
      expect(httpMethods.length).to.equal(3);
      httpMethods.map(httpMethod => {
        expect(httpMethod).to.be.an('object', 'httpMethod is not an object');
        expect(httpMethod.path).to.be.a('string', 'httpMethod.path is not a string');
        expect(httpMethod.httpVerb).to.be.a('string', 'httpMethod.httpVerb is not a string');
        expect(httpMethod.methodObj).to.be.an('object', 'httpMethod.methodObj is not an object');
      });
    });

    it('should have found no Http Methods', () => {

    });
  });

  describe('Parser - Extract Responses', () => {
    it('should have found Responses', () => {

    });

    it('should have found no Responses', () => {

    });
  });

  describe('Parser - Extract Content', () => {
    it('should have found Content', () => {

    });

    it('should have found no Content', () => {

    });
  });

  describe('Parser - Extract Schemas', () => {
    it('should have found Schemas', () => {

    });

    it('should have found no Schemas', () => {

    });
  });
});