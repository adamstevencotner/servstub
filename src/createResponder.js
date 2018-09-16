module.exports = (app, route, method, response) => {
  method = method.toLowerCase()
  
  if (!app[method] || typeof app[method] !== 'function')
    throw new Error(`could not register ${route}: "${method}"" is not a valid method`)

  if (typeof response === 'function')
    return app[method](route, (req, res) => response(req, res))

  if (typeof response === 'number' && isFinite(response))
    return app[method](route, (req, res) => res.status(response) && res.send({}))

  if (response && typeof response === 'object') {
    if (response.headers && typeof response.headers !== 'object')
      throw new Error(`could not register ${route}: "headers" is not of an appropriate type`)

    if (typeof response.body === 'undefined')
      throw new Error(`could not register ${route}: "body" is not defined`)

    return app[method](route, (req, res) => 
      res.set(response.headers || {}) && res.status(response.status || 200) && res.send(response.body))
  }

  throw new Error(`could not register ${route}: "response" is not of an appropriate type`)
}
