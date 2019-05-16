const validator = require('validator');

const httpMethods = ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch'];
const httpStatusCodes = ['202', '502', '400', '409', '100', '201', '417', '424', '403', '504', '410', '505', '418', '419', '507', '500', '411', '423', '420', '405', '301', '302', '207', '300', '511', '204', '203', '406', '404', '501', '304', '200', '206', '402', '308', '412', '428', '102', '407', '431', '408', '413', '414', '416', '205', '303', '503', '101', '307', '429', '401', '422', '415', '305'];

const acceptedVersion = {
  version: '3.0.0',
  number: 300
};

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
    // check if Paths have HTTP Verbs (at least 1)
    result.allPathsHaveHttpVerb = await _verifyIfPathHasHttpVerb(jsonOutput);
    // check if schema per content per path exists
    result.allContentsRefSchema = await _verifyIfPathReferencesContent(jsonOutput);
    result.allPathsRefContent = await _verifyIfContentReferencesSchema(jsonOutput);

    return result;
  },
  identifyPaths: (jsonOutput) => {},
  identifyComponents: (jsonOutput) => {},
  identifySchemas: (jsonOutput) => {}
};

async function _verifyOpenApiVersion (output) {
  if (output.indexOf('openapi')) {
    let jsonOutput = JSON.parse(output);
    let apiVersion = jsonOutput.openapi;
    return parseInt(apiVersion.replace(/\./g, '')) >= acceptedVersion.number;
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
  let pathsKeys = await _identifyPaths(output);

  return pathsKeys.length > 0;
}

async function _identifyPaths (output) {
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

  return pathsKeys;
}

async function _verifyIfPathHasHttpVerb (output) {
  // if one given http path has no verbs, parser cannot work.

  let jsonOutput = JSON.parse(output);

  let pathKeys = await _identifyPaths(output);

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

async function _verifyIfPathReferencesContent (output) {
  return false;
}

async function _verifyIfContentReferencesSchema (output) {
  return false;
}

async function _identifyHttpCodesOfResponses(output) {
  return {};
}