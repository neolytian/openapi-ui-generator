
const extractor = require('./extractor');
const verifier = require('./verifier');

module.exports = {
  verifyOpenApiFile: verifier.verifyOpenApiFile,
  verifyOpenApiVersion: verifier.verifyOpenApiVersion,
  verifyIfServerExist: verifier.verifyIfServerExist,
  verifyIfPathsExist: verifier.verifyIfPathsExist,
  verifyIfPathHasHttpVerb: verifier.verifyIfPathHasHttpVerb,
  verifyIfPathReferencesContent: verifier.verifyIfPathReferencesContent,
  extractComponents: extractor.extractComponents,
  extractPaths: extractor.extractPaths,
  extractHttpMethods: extractor.extractHttpMethods,
  extractResponses: extractor.extractResponses,
  extractContent: extractor.extractContent,
  extractSchemas: extractor.extractSchemas
};