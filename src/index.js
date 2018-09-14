#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const register = require('./register.js');
const parse_args = require('./parse_args.js')

const [ , , ...cli_args ] = process.argv
const app = express()

try {
	var { config, port } = parse_args(cli_args)
	register(app, config)
} catch (e) {
	console.log(`${e.name}: ${e.message}`)
	process.exit(1)
}

app.use(bodyParser.json())
app.listen(port, () => {
	console.log('server started.')
})
