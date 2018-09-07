#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const register = require('./register.js');

const app = express();
const port = 8000

const [,, ...args] = process.argv;
const path = args[0];

const registry = require(path);

app.use(bodyParser.json());

register(app, registry);

app.listen(port, () => {
	console.log('server started.')
})
