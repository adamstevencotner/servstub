#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const register = require('./register.js');
const parse_args = require('./parse_args.js')

const app = express()
const [ , , ...cli_args ] = process.argv
const { config, port } = parse_args(cli_args)

register(app, config)

app.use(bodyParser.json())
app.listen(port, () => {
	console.log('server started.')
})
