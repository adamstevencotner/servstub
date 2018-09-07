module.exports = (app, registry) => {
	 for (let { route, method, responder } of registry) {
		switch(method) {
			case 'GET':
				app.get(route, (req, res) => res.send({ method: 'GET' }));
				break;
			case 'POST':
				app.post(route, createResponse(responder));
				break;
			default:
				console.log(`could not register ${route}`);
		}
		
		console.log(`registered ${method} for endpoint ${route}`);
	};
}

const createResponse = (responder) => 
	(req, res) => res.send(responder(req));