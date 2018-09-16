const ValidationError = require('./errors/ValidationError')

module.exports = (app, route, method, response) => {
  method = method.toLowerCase()
  
  if (!app[method] || typeof app[method] !== 'function')
    throw new ValidationError(`could not register ${route}: "${method}"" is not a valid method`)

  if (typeof response === 'function')
    return app[method](route, (req, res) => response(req, res))

  if (typeof response === 'number' && isFinite(response))
    return app[method](route, (req, res) => res.status(response).send({}))

  if (response && typeof response === 'object') {
    if (response.headers && typeof response.headers !== 'object')
      throw new ValidationError(`could not register ${route}: "headers" is not of an appropriate type`)

    if (typeof response.body === 'undefined')
      throw new ValidationError(`could not register ${route}: "body" is not defined`)

    return app[method](route, (req, res) => {
      res.set(response.headers || {}).status(response.status || 200).send(response.body)
    })
  }

  throw new ValidationError(`could not register ${route}: "response" is not of an appropriate type`)
}
