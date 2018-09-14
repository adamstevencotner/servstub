module.exports = (app, registry) => {
	for (let { route, method, response } of registry) {
		switch(method) {
			case 'GET':
				app.get(route, createResponder(response))
				break
			case 'POST':
				app.post(route, createResponder(response))
				break
			case 'PUT':
				app.put(route, createResponder(response))
				break
			default:
				console.log(`could not register ${route}`)
				process.exit(1)
		}
		
		console.log(`registered ${method} for endpoint ${route}`);
	}
}

const createResponder = (response) => {
	if (response && typeof response === 'function')
		return (req, res) => res.send(response(req))

	if (response && typeof response === 'object')
		return (req, res) => res.send(response)

	if (response && typeof response === 'number' && isFinite(response))
		return (req, res) => res.status(response) && res.send({})

	return (req, res) => res.send({})
}
