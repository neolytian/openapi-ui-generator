const validator = require('validator');
const extractPaths = require('./extractor').extractPaths;

module.exports = {
  verifyOpenApiFile: verifyOpenApiFile,
  verifyOpenApiVersion: verifyOpenApiVersion,
  verifyIfServerExist: verifyIfServerExist,
  verifyIfPathsExist: verifyIfPathsExist,
  verifyIfPathHasHttpVerb: verifyIfPathHasHttpVerb,
  verifyIfPathReferencesContent: verifyIfPathReferencesContent
};

const acceptedVersion = {
  version: '3.0.0',
  number: 300
};

async function verifyOpenApiFile (jsonOutput) {
  let result = {
    validOpenAPIVersion: false,
    serverExists: false,
    pathExits: false,
    allPathsHaveHttpVerb: false,
    allPathsRefContent: false,
    allContentsRefSchema: false
  };

    // verify if File is at least version openapi 3.0.0

  result.validOpenAPIVersion = await verifyOpenApiVersion(jsonOutput);
    // check if servers exist
  result.serverExists = await verifyIfServerExist(jsonOutput);
    // check if Paths Exist
  result.pathExits = await verifyIfPathsExist(jsonOutput);
    // check if Paths have HTTP Verbs (at least 1)
  result.allPathsHaveHttpVerb = await verifyIfPathHasHttpVerb(jsonOutput);
    // check if schema per content per path exists
  result.allPathsRefContent = await verifyIfPathReferencesContent(jsonOutput);
  result.allContentsRefSchema = await verifyIfContentReferencesSchema();

  return result;
}

async function verifyOpenApiVersion (jsonStringInput) {
  if (jsonStringInput.indexOf('openapi')) {
    let jsonOutput = JSON.parse(jsonStringInput);
    let apiVersion = jsonOutput.openapi;
    return parseInt(apiVersion.replace(/\./g, '')) >= acceptedVersion.number;
  }
  return false;
}

async function verifyIfServerExist (jsonStringInput) {
  let result = false;
  if (jsonStringInput.indexOf('servers')) {
    let jsonOutput = JSON.parse(jsonStringInput);
    for (const server of jsonOutput.servers) {
      result = await validator.isURL(server.url);
    }
  }
  return result;
}

async function verifyIfPathsExist (jsonStringInput) {
  let pathsKeys = await extractPaths(jsonStringInput);

  return pathsKeys.length > 0;
}

async function verifyIfPathHasHttpVerb (jsonStringInput) {
    // if one given http path has no verbs, parser cannot work.

  let jsonOutput = JSON.parse(jsonStringInput);

  let pathKeys = await extractPaths(jsonStringInput);

  let result;
  pathKeys.forEach(element => {
    let httpGet = jsonOutput.paths[element].get;
    let httpHead = jsonOutput.paths[element].head;
    let httpPost = jsonOutput.paths[element].post;
    let httpPut = jsonOutput.paths[element].put;
    let httpDelete = jsonOutput.paths[element].delete;
    let httpConnect = jsonOutput.paths[element].connect;
    let httpOptions = jsonOutput.paths[element].options;
    let httpTrace = jsonOutput.paths[element].trace;
    let httpPatch = jsonOutput.paths[element].patch;
    result = (typeof httpGet !== 'undefined') ||
            (typeof httpHead !== 'undefined') ||
            (typeof httpPost !== 'undefined') ||
            (typeof httpPut !== 'undefined') ||
            (typeof httpDelete !== 'undefined') ||
            (typeof httpConnect !== 'undefined') ||
            (typeof httpOptions !== 'undefined') ||
            (typeof httpTrace !== 'undefined') ||
            (typeof httpPatch !== 'undefined');
  });

  return result;
}

async function verifyIfPathReferencesContent (jsonStringInput) {
  let jsonOuptut = JSON.parse(jsonStringInput);

  let results = [];
    // Q: Which paths do we have?
  let pathkeys = await extractPaths(jsonStringInput);
    // Q: Does a path have responses?
  pathkeys.map(key => {
    let path = jsonOuptut.paths[key];
    for (const httpMethod in path) { // TODO: Get rid of the christmas tree! Write in more functional style!
      if (path.hasOwnProperty(httpMethod)) {
                // A: Only Http Get response with Content...
        if (httpMethod === 'get') {
          const method = path[httpMethod];
                    // console.log(method.responses);
          for (const statusCode in method.responses) {
            if (method.responses.hasOwnProperty(statusCode)) {
                            // Q: Which HttpStatus Codes does each response have?
              if (statusCode === '204') continue; // HTTP 204 == No Content - No Check
              const httpResponse = method.responses[statusCode];
                            // console.log(typeof httpResponse.content);

              const valid = typeof httpResponse.content !== 'undefined' && httpResponse.content.hasOwnProperty('application/json') || httpResponse.content.hasOwnProperty('application/xml');
              results.push(valid);
            }
          }
        }
      }
    }
  });
    // console.log(await _extractHttpMethods(pathkeys, jsonStringInput));
  return !results.includes(false);
}

async function verifyIfContentReferencesSchema () {
  return false;
}