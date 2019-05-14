const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');
const yml = '.yml';
const yaml = '.yaml';

module.exports = {
  verifyFile: (filePath) => {
    let result = fs.existsSync(filePath);
    if (result) {
      result = path.extname(filePath) === yaml || path.extname(filePath) === yml;
      return result;
    } else {
      throw new Error('File does not exist');
    }
  },
  importFile: async (path) => {
    return jsYaml.safeLoad(fs.readFileSync(path, 'utf8'));
  }
};