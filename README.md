# servstub
a cli tool for quickly defining stateless apis

**1) create a config**
```
// config.js
module.exports = [
  {
    'route': '/echo',
    'method': 'get'
    'response': (req) => req.query['message']
  },
  // ...
];
```

**2) start the server**

`servstub config.js`

**3) hit it**

`curl -X GET http://localhost:8000/echo?message=Hello%20World!`

responds with
```
Hello World!
```

## Installation
`npm install -g servstub`

**Prerequisites**
- [installed](https://nodejs.org/en/download/) `npm` and `node`
- [basic knowledge](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) of JavaScript
- [basic knowledge](https://expressjs.com/en/4x/api.html) of `express`

## Usage
once you have a config file, run

`servstub path/to/configfile.js`

and an api server will spin up on port `8000`

## Configuration
basic rules:
1) you must create a config file for `servstub` to work
2) the config file must be a `.js` file with a default export
3) the export must be of type `Array`, where each item represents is an `endpoint_config`

### endpoint_config object
an `endpoint_config` object has the following properties:
#### "route" (string/array, _required_)
defines valid route(s). if `route` is a string, it is passed as-is into `espress` as a route. if `route` is an array of strings, each string is passed a new route.
#### "method" (string/array, _required_)
defines valid methods. if `method` is a string, it is passed as-is into `espress` as a route. if `method` is an array of strings, each string is passed as a new method on a route.
#### "response" (number/function/response_config, _required_)
defines response. the following situations apply given the type of `response`:

**number**: if `response` is a number, the endpoint with return that number as the status code, with an empty reponse body

**function**: if `response` is a function, `express` will call that function with the [Request](https://expressjs.com/en/4x/api.html#req) object to get a response body

**response_config**: if `response` is an object, it must conform to the `response_config` schema

### response_config object
an `endpoint_config` object has the following properties:
#### "body" (string/number/object, _required_)
this is the body of the response
#### "headers" (object)
an object that will extend the existing headers. default: `{}`
#### "status" (number)
the status code to send back with the response. default: `200`
