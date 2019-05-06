/* eslint-disable no-undef */
'use strict'
var chai = require('chai')
var expect = chai.expect
var objectTypes = require('object-types')

var fileImporter = require('../file-import')

describe('File Importer', function () {
  it('importFile returns an Object', function () {
    var object = fileImporter.importFile()
    expect(objectTypes(object) == 'object')
  })
})
