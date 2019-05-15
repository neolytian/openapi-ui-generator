const url = require('url');

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
    result.serverExists = await _verifyIfPathsExist(jsonOutput);
    result.pathExits = await _verifyIfServerExist(jsonOutput);
    result.allPathsHaveHttpVerb = await _verifyIfPathHasHttpVerb(jsonOutput);
    result.allContentsRefSchema = await _verifyIfPathReferencesContent(
      jsonOutput
    );
    result.allPathsRefContent = await _verifyIfContentReferencesSchema(
      jsonOutput
    );

    // check if Paths Exist
    // check if servers exist
    // check if Paths have HTTP Verbs (at least 1)
    // check if schema per content per path exists
    return result;
  },
  identifyPaths: jsonOutput => { },
  identifyComponents: jsonOutput => { },
  identifySchemas: jsonOutput => { }
};

const acceptedVersion = {
  version: '3.0.0'
};

async function _verifyOpenApiVersion (output) {
  if (output.indexOf('openapi')) {
    let jsonOutput = JSON.parse(output);
    let apiVersion = jsonOutput.openapi;

    return (
      JSON.stringify(apiVersion) === JSON.stringify(acceptedVersion.version)
    );
  }

  return false;
}

async function _verifyIfPathsExist (output) {
  return false;
}

async function _verifyIfServerExist (output) {
  if (output.indexOf('servers')) {
    let jsonOutput = JSON.parse(output);
    jsonOutput.servers.forEach(element => {
      try {
        console.log('Server: ' + element.url);
        url.parse(element.url);
      } catch (e) {
        if (typeof e === TypeError) {
          throw new Error(e);
        } else {
          throw new Error(e);
        }
      }
    });
    return true;
  }
  return false;
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
