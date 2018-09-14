const path = require('path')
const fs = require('fs')

module.exports = (args) => {
	const relpath = args[0];
	const abspath = path.join(process.cwd(), relpath)

	if (!fs.existsSync(abspath)) {
	    console.log(`no file found at ${abspath}`)
	    process.exit(1)
	}

	if (path.extname(abspath) !== '.js') {
	    console.log(`file must be ".js". got "${path.extname(abspath)}" instead`)
	    process.exit(1)
	}

	let config
	try {
		 config = require(abspath)
	} catch (e) {
		console.log(`could not import file at ${abspath}`)
		process.exit(1)
	}

	return { config, port: 8000 }
}
