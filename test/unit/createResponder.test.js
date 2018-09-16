const createResponder = require('../../src/createResponder')
const stringMock = require('../mocks/stringMock')
const expressResponseMock = require('../mocks/expressResponseMock')
const ValidationError = require('../../src/errors/ValidationError')

const match = (filter) => ({
  asymmetricMatch: filter
})

describe('createResponder.js', () => {
  let app
  let route
  let method
  let response

  beforeEach(() => {
    app = jest.fn()
    route = stringMock(1)
    method = stringMock(2)
    response = jest.fn()
  })

  it('should throw when method does not exist on app', () => {
    expect(() => createResponder(app, route, method, response)).toThrow(ValidationError)
  })

  it('should register a number response', () => {
    method = 'get'
    app[method] = jest.fn()

    const body = {} // TODO: get from default enum?
    const status = 404
    response = status

    createResponder(app, route, method, response)
    expect(app[method]).toBeCalledWith(route, match(fn => {
      const req = jest.fn()
      const res = expressResponseMock()
      fn(req, res)

      expect(res.status).toBeCalledWith(status)
      expect(res.send).toBeCalledWith(body)
      return true
    }))
  })

  it('should register a function response', () => {
    method = 'get'
    app[method] = jest.fn()
    response = jest.fn()

    createResponder(app, route, method, response)
    expect(app[method]).toBeCalledWith(route, match(fn => {
      const req = jest.fn()
      const res = jest.fn()
      fn(req, res)

      expect(response).toBeCalledWith(req, res)
      return true
    }))
  })

  it('should throw when response is an object and headers is not', () => {
    method = 'get'
    app[method] = jest.fn()
    response = {
      'headers': 'I\'m a string',
      'body': ''
    }

    expect(() => createResponder(app, route, method, response)).toThrow(ValidationError)
  })

  it('should throw when response is an object and body is undefined', () => {
    method = 'get'
    app[method] = jest.fn()
    response = {
      'headers': {}
    }

    expect(() => createResponder(app, route, method, response)).toThrow(ValidationError)
  })

  it('should not throw when response is an object and headers is undefined', () => {
    method = 'get'
    app[method] = jest.fn()
    response = {
      'headers': {},
      'body': ''
    }

    expect(() => createResponder(app, route, method, response)).not.toThrow(ValidationError)
  })

  it('should throw when response is not object, function, or number', () => {
    method = 'get'
    app[method] = jest.fn()
    response = 'I\'m a string'

    expect(() => createResponder(app, route, method, response)).toThrow(ValidationError)
  })

  it('should register a object response', () => {
    method = 'get'
    app[method] = jest.fn()

    const body = 'body'
    const status = 404
    const headers = { 'header': 'value' }
    response = {
      body, status, headers
    }

    createResponder(app, route, method, response)
    expect(app[method]).toBeCalledWith(route, match(fn => {
      const req = jest.fn()
      const res = expressResponseMock()
      fn(req, res)

      expect(res.set).toBeCalledWith(headers)
      expect(res.status).toBeCalledWith(status)
      expect(res.send).toBeCalledWith(body)
      return true
    }))
  })

  it('should register a object response with defaults', () => {
    method = 'get'
    app[method] = jest.fn()

    const body = 'body'
    const status = 200 //TODO: get from defaults enum?
    const headers = {} //TODO: get from defaults enum?
    response = {
      body
    }

    createResponder(app, route, method, response)
    expect(app[method]).toBeCalledWith(route, match(fn => {
      const req = jest.fn()
      const res = expressResponseMock()
      fn(req, res)

      expect(res.set).toBeCalledWith(headers)
      expect(res.status).toBeCalledWith(status)
      expect(res.send).toBeCalledWith(body)
      return true
    }))
  })
})
