module.exports = {
  extractComponents: extractComponents,
  extractPaths: extractPaths,
  extractHttpMethods: extractHttpMethods,
  extractResponses: extractResponses,
  extractContent: extractContent,
  extractSchemas: extractSchemas
};

async function extractPaths (jsonInput) {
  const openAPIdocument = await _parseInput(jsonInput);

    // console.log(jsonOutput.paths);
  let paths = openAPIdocument.paths;
  let element = null;
  let counter = 0;
  let pathsKeys = [];
  for (element in paths) {
    pathsKeys[counter] = element;
    counter++;
  }
  return pathsKeys;
}

async function extractHttpMethods (pathkeys, jsonInput) {
  const openAPIdocument = await _parseInput(jsonInput);

  const httpsMethods = [];
  let httpMethodObj = {
    path: '',
    httpVerb: '',
    methodObj: {}
  };

  pathkeys.map(key => {
    let path = openAPIdocument.paths[key];
    for (const httpMethod in path) {
      if (path.hasOwnProperty(httpMethod)) {
        httpMethodObj.path = key;
        httpMethodObj.httpVerb = httpMethod;
        httpMethodObj.methodObj = path[httpMethod];
        httpsMethods.push(httpMethodObj);
      }
    }
  });

  return httpsMethods;
}

async function extractResponses (httpMethods) {
  const responses = [];
  let responseRes = {
    path: '',
    httpVerb: '',
    statusCode: '',
    responseObj: {}
  };

  httpMethods.map(httpMethod => {
    for (const response in httpMethod.methodObj.responses) {
      if (httpMethod.methodObj.responses.hasOwnProperty(response)) {
        responseRes.path = httpMethod.path;
        responseRes.httpVerb = httpMethod.httpVerb;
        responseRes.statusCode = response;
        responseRes.responseObj = httpMethod.methodObj.responses[response];
        responses.push(responseRes);
      }
    }
  });
  return responses;
}

async function extractContent (responses) {
  let contentRes = {
    path: '',
    httpVerb: '',
    statusCode: '',
    contentType: '',
    contentObj: {}
  };
  const contents = [];

  responses.map(response => {
    for (const contentType in response.responseObj.content) {
      if (response.responseObj.content.hasOwnProperty(contentType)) {
        contentRes.path = response.path;
        contentRes.httpVerb = response.httpVerb;
        contentRes.statusCode = response.statusCode;
        contentRes.contentType = contentType;
        contentRes.contentObj = response.responseObj.content[contentType];
        contents.push(contentRes);
      }
    }
  });
  return contents;
}

async function extractSchemas (contents) {
  const schemas = [];
  const schema = {
    path: '',
    httpVerb: '',
    statusCode: '',
    contentType: '',
    schemaName: '',
    schemaObj: {}
  };

  await contents.map(async (content) => {
    for (const reference in content.contentObj.schema) {
      if (content.contentObj.schema.hasOwnProperty(reference)) {
        schema.path = content.path;
        schema.httpVerb = content.httpVerb;
        schema.statusCode = content.statusCode;
        schema.contentType = content.contentType;
        schema.schemaName = await _extractSchemaName(content.contentObj.schema, reference);
        schema.schemaObj = content.contentObj.schema;

        schemas.push(schema);
      }
    }
  });

  return schemas;
}

async function _extractSchemaName (schema, reference) {
  var schemaPath = schema[reference];
  var pathComponents = schemaPath.split('/');
  return pathComponents[pathComponents.length - 1];
}

async function extractComponents (jsonInput, schema) {
  if (schema instanceof Array) {
    let components = [];

    schema.map((schema) => {
      let component = _extractComponent(jsonInput, schema.schemaName);
      components.push(component);
    });

    return components;
  }

  if (schema instanceof Object) {
    return _extractComponent(jsonInput, schema.schemaName);
  }
}

async function _extractComponent (jsonInput, schemaName) {
  let counter = 0;
  const openAPIdocument = _parseInput(jsonInput);

  const component = {
    name: '',
    type: '',
    isErrorType: false,
    items: {
      hasReference: true,
      reference: ''
    },
    referencedComponent: {},
    properties: {},
    required: []
  };

  const docComponent = openAPIdocument.components.schemas[schemaName];
  component.name = schemaName;

  console.log(docComponent);
  if (docComponent.hasOwnProperty('items')) {
    if (docComponent.items.hasOwnProperty('$ref')) {
      const reference = docComponent.items['$ref'];
      console.log(reference);

        // Split the reference String
      let ref = reference.split('/');
      let length = ref.length;
      let refSchemaName = ref[length - 1];

      let referencedComponent = await _extractComponent(jsonInput, refSchemaName);

      component.referencedComponent = referencedComponent;
      component.type = docComponent.type;
      return component;
    }
  }

  if (schemaName.contains('Error')) { // Convention!!! TODO: Make obvious in documentation
    component.isErrorType = true;
  }

  if (docComponent.required !== null) {
    component.required = docComponent.required;
  }

  if (docComponent.properties !== null) {
    component.properties = docComponent.properties;
  }

  return component;
}

function _parseInput (jsonInput) {
  return JSON.parse(jsonInput);
}