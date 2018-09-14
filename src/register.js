module.exports = (app, registry) => {
	for (let { route, method, response } of registry) {
		
		if (!app[method] || typeof app[method] !== 'function')
			throw new Error(`could not register ${route}: "${method}"" is not a valid method`)

		app[method](route, createResponder(route, response))
		console.log(`registered ${method} for endpoint ${route}`);
	}
}

const createResponder = (route, response) => {
	if (typeof response === 'function')
		return (req, res) => res.send(response(req))

	if (typeof response === 'number' && isFinite(response))
		return (req, res) => res.status(response) && res.send({})

	if (response && typeof response === 'object')
		return (req, res) => {
			if (response.headers)
				res.set(response.headers)

			if (response.status)
				res.status(response.status)

			res.send(response.body)
		}

	throw new Error(`could not register ${route}: "response" is not of an appropriate type`)
}
