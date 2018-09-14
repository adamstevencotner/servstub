const path = require('path')
const fs = require('fs')

module.exports = (args) => {
	let port, abspath
	for (let i = 0; i < args.length; i++) {
		if (args[i].startsWith('--port=')) {
			port = args[i].substring(7)
		} else if (args[i] === '--port' || args[i] === '-p') {
			port = args[++i]
		} else {
			abspath = path.join(process.cwd(), args[i])
		}
	}

	if (!fs.existsSync(abspath)) {
	    throw new Error(`no file found at ${abspath}`)
	}

	if (path.extname(abspath) !== '.js') {
	    throw new Error(`file must be ".js". got "${path.extname(abspath)}" instead`)
	}

	try {
		 var config = require(abspath)
	} catch (e) {
		throw new Error(`could not import file at ${abspath}`)
	}

	return { config, port: port || 8000 }
}
