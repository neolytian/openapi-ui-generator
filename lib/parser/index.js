const validator = require('validator');

module.exports = {
  verifyOpenApiFile: async jsonOutput => {
    let result = {
      validOpenAPIVersion: false,
      serverExists: false,
      pathExits: false,
      allPathsHaveHttpVerb: false,
      allPathsRefContent: false,
      allContentsRefSchema: false
    };

    // verify if File is at least version openapi 3.0.0

    result.validOpenAPIVersion = await _verifyOpenApiVersion(jsonOutput);
    // check if servers exist
    result.serverExists = await _verifyIfServerExist(jsonOutput);
    // check if Paths Exist
    result.pathExits = await _verifyIfPathsExist(jsonOutput);
    result.allPathsHaveHttpVerb = await _verifyIfPathHasHttpVerb(jsonOutput);
    result.allContentsRefSchema = await _verifyIfPathReferencesContent(jsonOutput);
    result.allPathsRefContent = await _verifyIfContentReferencesSchema(jsonOutput);

    // check if Paths have HTTP Verbs (at least 1)
    // check if schema per content per path exists
    return result;
  },
  identifyPaths: (jsonOutput) => {},
  identifyComponents: (jsonOutput) => {},
  identifySchemas: (jsonOutput) => {}
};

const acceptedVersion = {
  version: '3.0.0',
  number: 300
};

async function _verifyOpenApiVersion (output) {
  if (output.indexOf('openapi')) {
    let jsonOutput = JSON.parse(output);
    let apiVersion = jsonOutput.openapi;
    return (
        parseInt(apiVersion.replace(/\./g, '')) >= acceptedVersion.number
      );
  }
  return false;
}

async function _verifyIfServerExist (output) {
  let result = false;
  if (output.indexOf('servers')) {
    let jsonOutput = JSON.parse(output);
    for (const server of jsonOutput.servers) {
      result = await validator.isURL(server.url);
    }
  }
  return result;
}

async function _verifyIfPathsExist (output) {
  let jsonOutput = JSON.parse(output);

 // console.log(jsonOutput.paths);
  let paths = jsonOutput.paths;
  let element = null;
  let counter = 0;
  let pathsKeys = [];
  for (element in paths) {
    pathsKeys[counter] = element;
    counter++;
  }

  return counter > 0;
}

async function _verifyIfPathHasHttpVerb (output) {
  return false;
}

async function _verifyIfPathReferencesContent (output) {
  return false;
}

async function _verifyIfContentReferencesSchema (output) {
  return false;
}