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

  it('should have found no Http Methods', async () => {
    let path = './test/resources/parser/PetStoreOutput_No_HTTPVerb_in_path.json';
    var jsonInput = fs.readFileSync(path, 'utf8');
    var pathkeys = ['/pets', '/pets/{petId}'];
    var httpMethods = await parser.extractHttpMethods(pathkeys, jsonInput);

    expect(httpMethods).to.be.an('array');
    expect(httpMethods.length).to.equal(0);
  });
});

describe('Parser - Extract Responses', () => {
  it('should have found Responses', async () => {
    const httpMethods = [];
    const httpMethod = {
      path: '/pets/{petId}',
      httpVerb: 'get',
      methodObj: {
        summary: 'Info for a specific pet',
        operationId: 'showPetById',
        tags: [],
        parameters: [],
        responses: {
          200: {
            description: 'description',
            headers: {},
            content: {}
          },
          default: {
            description: 'description',
            headers: {},
            content: {}
          }
        }
      }
    };
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);

    let responses = await parser.extractResponses(httpMethods);

    expect(responses).to.be.an('array');
    expect(responses.length).to.equal(12);

    responses.map(response => {
      expect(response.path).to.be.a('string');
      expect(response.httpVerb).to.be.a('string');
      expect(response.statusCode).to.be.a('string');
      expect(response.responseObj).to.be.an('object');
    });
  });

  it('should have found no Responses', async () => {
    const httpMethods = [];
    const httpMethod = {
      path: '/pets/{petId}',
      httpVerb: 'get',
      methodObj: {
        summary: 'Info for a specific pet',
        operationId: 'showPetById',
        tags: [],
        parameters: [],
        responses: {}
      }
    };
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);
    httpMethods.push(httpMethod);

    let responses = await parser.extractResponses(httpMethods);

    expect(responses).to.be.an('array');
    expect(responses.length).to.equal(0);
  });
});

describe('Parser - Extract Content', () => {
  it('should have found Content', async () => {
    const responseObj = {
      description: 'description',
      headers: {},
      content: {
        'application/json': {
          schema: {
            '$ref': '#/components/schemas/Pets'
          }
        }
      }
    };
    const response = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      responseObj: responseObj
    };

    const responses = [];
    responses.push(response);
    responses.push(response);
    responses.push(response);
    responses.push(response);
    responses.push(response);
    responses.push(response);

    let contents = await parser.extractContent(responses);

    expect(contents).to.be.an('array');
    expect(contents.length).to.equal(6);
    contents.map(content => {
      expect(content.path).to.equal('/pets');
      expect(content.httpVerb).to.equal('get');
      expect(content.statusCode).to.equal(200);
      expect(content.contentType).to.equal('application/json');
      expect(content.contentObj).to.not.be.an('undefined');
    });
  });

  it('should have found no Content', async () => {
    const responseObj = {
      description: 'description',
      headers: {},
      content: {}
    };
    const response = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      responseObj: responseObj
    };

    const responses = [];
    responses.push(response);
    responses.push(response);
    responses.push(response);
    responses.push(response);
    responses.push(response);
    responses.push(response);
  });
});

describe('Parser - Extract Schemas', () => {
  it('should have found Schemas', async () => {
    var contentObj = {
      schema: {
        '$ref': '#/components/schemas/Pets'
      }
    };

    var content = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      contentType: 'application/json',
      contentObj: contentObj
    };

    var contents = [];
    contents.push(content);
    contents.push(content);
    contents.push(content);
    contents.push(content);
    contents.push(content);
    contents.push(content);
    let schemas = await parser.extractSchemas(contents);

    expect(schemas).to.be.an('array');
    expect(schemas.length).to.equal(6);
    schemas.map(schema => {
      expect(schema.path).to.equal(content.path);
      expect(schema.httpVerb).to.equal(content.httpVerb);
      expect(schema.statusCode).to.equal(content.statusCode);
      expect(schema.contentType).to.equal(content.contentType);
      expect(schema.schemaName).to.equal('Pets');
      expect(schema.schemaObj).to.not.be.an('undefined');
    });
  });

  it('should have found no Schemas', async () => {
    var contentObj = {};

    var content = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      contentType: 'application/json',
      contentObj: contentObj
    };

    var contents = [];
    contents.push(content);
    contents.push(content);
    contents.push(content);
    contents.push(content);
    contents.push(content);
    contents.push(content);
    contents.push(content);

    let schemas = await parser.extractSchemas(contents);

    expect(schemas).to.be.an('array');
    expect(schemas.length).to.equal(0);
  });
});

describe('Parser - Extract Components', () => {
  it('should have found components', async () => {
    let path = './test/resources/parser/PetStoreOutput.json';
    var jsonInput = fs.readFileSync(path, 'utf8');

    var schema1 = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      contentType: 'application/json',
      schemaName: 'Pets',
      schemaObj: {
        $ref: '#/components/schemas/Pets'
      }
    };

    var schema2 = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      contentType: 'application/json',
      schemaName: 'Pets',
      schemaObj: {
        $ref: '#/components/schem(as/Pets'
      }
    };

    const schemas = [];
    schemas.push(schema1);
    schemas.push(schema2);
    let components = await parser.extractComponents(jsonInput, schemas);

    expect(components).to.be.an('array');
    expect(components.length).to.equal(2);
    components.map(component => {
      expect(component.name).to.equal('Pets');
      expect(component.type).to.equal('array');
      expect(component.items).to.be.an('object');
      expect(component.items.required).to.be.an('array');
      expect(component.items.properties).to.be.an('array');

      const properties = component.items.properties;
      properties.map(property => {
        expect(property.name).to.not.be.a('null');
        expect(property.datatype).to.be.not.a('null');

        if (property.name === 'id') {
          expect(property.format).to.equal('int64');
        }
      });

    });

  });

  it('should have found component', () => {
    let path = './test/resources/parser/PetStoreOutput.json';
    var jsonInput = fs.readFileSync(path, 'utf8');

    var schema = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      contentType: 'application/json',
      schemaName: 'Pets',
      schemaObj: {
        $ref: '#/components/schemas/Pets'
      }
    };


  });

  it('should not have found components', () => {

    let path = './test/resources/parser/PetStoreOutput.json';
    var jsonInput = fs.readFileSync(path, 'utf8');

    var schema1 = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      contentType: 'application/json',
      schemaName: 'MÖÖP2',
      schemaObj: {
        $ref: '#/components/schemas/MÖÖP1'
      }
    };

    var schema2 = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      contentType: 'application/json',
      schemaName: 'MÖÖP1',
      schemaObj: {
        $ref: '#/components/schemas/MÖÖP2'
      }
    };



  });

  it('should not have found component', () => {
    let path = './test/resources/parser/PetStoreOutput.json';
    var jsonInput = fs.readFileSync(path, 'utf8');

    var schema = {
      path: '/pets',
      httpVerb: 'get',
      statusCode: 200,
      contentType: 'application/json',
      schemaName: 'MÖÖP',
      schemaObj: {
        $ref: '#/components/schemas/MÖÖP'
      }
    };
  });
});