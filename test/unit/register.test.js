const register = require('../../src/register')
const createResponder = require('../../src/createResponder')
const stringMock = require('../mocks/stringMock')

jest.mock('../../src/createResponder')

describe('register.js', () => {
  it('should bail with empty config', () => {
    const app = jest.fn()
    const config = []

    expect(() => register(app, config)).toThrow()
  })

  it('should call createResponder with single route and method', () => {
    const app = jest.fn()
    const route = stringMock(1)
    const method = stringMock(2)
    const response = jest.fn()
    const config = [{
      route,
      method,
      response
    }]

    register(app, config)
    expect(createResponder).toBeCalledWith(app, route, method, response)
  })

  it('should call createResponder with single route and many methods', () => {
    const app = jest.fn()
    const route = stringMock(1)
    const methods = [stringMock(2), stringMock(3)]
    const response = jest.fn()
    const config = [{
      route,
      method: methods,
      response
    }]

    register(app, config)
    expect(createResponder).toBeCalledWith(app, route, methods[0], response)
    expect(createResponder).toBeCalledWith(app, route, methods[1], response)
  })

  it('should call createResponder with many routes and single method', () => {
    const app = jest.fn()
    const routes = [stringMock(1), stringMock(2)]
    const method = stringMock(3)
    const response = jest.fn()
    const config = [{
      route: routes,
      method,
      response
    }]

    register(app, config)
    expect(createResponder).toBeCalledWith(app, routes[0], method, response)
    expect(createResponder).toBeCalledWith(app, routes[1], method, response)
  })
})  