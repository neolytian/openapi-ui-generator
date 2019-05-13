const fs = require('fs');


module.exports = {
  verifyFile: async (path) => {
    let result = false;
    await fs.access(path, (err) => {
      if (err) throw new Error('file not found: ' + err);
      result = true;
    });
    return result;
  },
  importFile: async (path) => {

  },
  convertToJSON: async (byteStream) => {

  }
};