const express = require('express');
const bodyParser = require('body-parser');
const register = require('../../src/register');
const parse_args = require('../../src/args/parse_args')

const match = (filter) => ({
  asymmetricMatch: filter
})

console = {
  log: jest.fn()
}

jest.mock('express', () => jest.fn())
jest.mock('body-parser', () => ({ json: jest.fn() }))
jest.mock('../../src/register', () => jest.fn())
jest.mock('../../src/args/parse_args', () => jest.fn())

describe('index.js', () => {
  it('listens', () => {
    const config = []
    const port = 9876

    parse_args.mockReturnValue({ config, port })

    const listen = jest.fn()
    const use = jest.fn()
    express.mockReturnValue({
      use: use,
      listen
    })

    const mockjson = ''
    bodyParser.json.mockReturnValue(mockjson)

    require('../../src/index')

    expect(use).toBeCalledWith(mockjson)
    expect(listen).toBeCalledWith(port, match(fn => true))
  })
})
