module.exports = (app, registry) => {
	 for (let { route, method, responder } of registry) {
		switch(method) {
			case 'GET':
				app.get(route, createResponse(responder));
				break;
			case 'POST':
				app.post(route, createResponse(responder));
				break;
			case 'PUT':
				app.put(route, createResponse(responder));
				break;
			default:
				console.log(`could not register ${route}`);
		}
		
		console.log(`registered ${method} for endpoint ${route}`);
	};
}

const createResponse = (responder) => {
	if (responder && typeof responder === 'function')
		return (req, res) => res.send(responder(req));

	if (responder && typeof responder === 'object')
		return (req, res) => res.send(responder);

	if (responder && typeof responder === 'number' && isFinite(responder))
		return (req, res) => res.status(responder) && res.send({});

	return (req, res) => res.send({});
}
