const fs = require('fs');

module.exports = {
  verifyFile: (path) => {
    let result = fs.existsSync(path);
    if (result) {
      return result;
    } else {
      throw new Error('File does not exist');
    }
  },
  importFile: async (path) => {

  },
  convertToJSON: async (byteStream) => {

  }
};