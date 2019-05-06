/* eslint-disable no-undef */
'use strict'
import { expect as _expect } from 'chai'
import objectTypes from 'object-types'

import { importFile } from '../file-import'
var expect = _expect

describe('File Importer', function () {
  it('importFile returns an Object', function () {
    var object = importFile()
    expect(objectTypes(object) == 'object')
  })
})
