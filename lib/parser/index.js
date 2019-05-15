module.exports = {
  verifyOpenApiFile: async (jsonOutput) => {
    let result = {
      validOpenAPIVersion: false,
      serverExists: false,
      pathExits: false,
      allPathsHaveHttpVerb: false,
      allPathsRefContent: false,
      allContentsRefSchema: false
    };

    // verify if File is version openapi 3.0.0
    // check if Paths Exist
    // check if servers exist
    // check if Paths have HTTP Verbs (at least 1)
    // check if schema per content per path exists
    return result;
  },
  _verifyOpenApiVersion: () => {

  },
  _verifyIfPathsExist: () => {

  },
  _verifyIfServerExist: () => {

  },
  _verifyIfPathHasHttpVerb: () => {

  },
  _verifyIfPathReferencesContent: () => {

  },
  _verifyIfContentReferencesSchema: () => {

  },
  identifyPaths: (jsonOutput) => {

  },
  identifyComponents: (jsonOutput) => {

  },
  identifySchemas: (jsonOutput) => {

  }
};