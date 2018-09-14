module.exports = (app, registry) => {
	for (let { route, method, response } of registry) {
		for (let _route of (Array.isArray(route) ? route : [route])) {
			for (let _method of (Array.isArray(method) ? method : [method])) {
				createResponder(app, _route, _method, response)
				console.log(`registered ${_method} for endpoint ${_route}`);
			}
		}
	}
}

const createResponder = (app, route, method, response) => {
	if (!app[method] || typeof app[method] !== 'function')
		throw new Error(`could not register ${route}: "${method}"" is not a valid method`)

	if (typeof response === 'function')
		return app[method](route, (req, res) => res.send(response(req)))

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
