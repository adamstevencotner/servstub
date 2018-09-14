const path = require('path')
const fs = require('fs')

module.exports = (args) => {
	const relpath = args[0];
	const abspath = path.join(process.cwd(), relpath)

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

	return { config, port: 8000 }
}
