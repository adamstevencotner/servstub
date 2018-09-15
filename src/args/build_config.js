const prompt = require('prompt-sync')()

module.exports = () => {
	let config = [], port = 8000

	while (true) {
		input = prompt('servstub> ')
		args = input.split(' ')

		switch (args[0].toLowerCase()) {
			case 'start':
				return { config, port }
				break
			case 'port':
				port = args[1]
				break
			case 'add':
				config.push({
					route: args[2],
					method: args[1],
					response: JSON.parse(args[3])
				})
				break
			case 'rm':
				config = config
					.filter(c => c.route !== args[2] || c.method.toLowerCase() !== args[1].toLowerCase())
				break
			case 'info':
				for (let c of config)
					console.log(c.method.toUpperCase(), c.route, c.response)
				break
			case 'quit': 
				process.exit(0)
				break
			default:
				console.log('unrecognized command')
				break
		}
	}
}
