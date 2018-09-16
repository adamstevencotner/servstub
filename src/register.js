const createResponder = require('./createResponder')
const ValidationError = require('./errors/ValidationError')

module.exports = (app, registry) => {
  if (registry.length === 0)
    throw new ValidationError(`no routes given to register`)
  
  for (let { route, method, response } of registry) {
    for (let _route of (Array.isArray(route) ? route : [route])) {
      for (let _method of (Array.isArray(method) ? method : [method])) {
        createResponder(app, _route, _method, response)
        console.log(`${_method.toUpperCase()} ${_route}`);
      }
    }
  }
}
