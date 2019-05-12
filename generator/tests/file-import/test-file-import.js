'use strict'

var chai = require('chai')
var expect = chai.expect
var fileImport = require('./../../lib/file-import/index')
var objectTypes = require('object-types')

describe('Ensure that imported service description is parsable', () => {

  var file = fileImport.importFile();

  expect(objectTypes(file) === 'object')
});