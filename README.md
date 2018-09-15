# servstub
a cli tool for quickly defining stateless apis


**EITHER**

configure a server with the cli
```
user@machine$ servstub
servstub> add GET /hello {"body":"HelloWorld!"}
servstub> start
```
**OR**

configure a server with a config file
```
// config.js
module.exports = [
  {
    'route': '/hello',
    'method': 'get'
    'response': {
      'body': 'HelloWorld!'
    }
  },
  // ...
];
```
and

```
user@machine$ servstub config.js
```

**AND PRESTO!**

```
user@machine$ curl -X GET http://localhost:8000/hello
HelloWorld!
```

# Installation
`npm install -g servstub`

will install `servstub` globally, and allow you to use the cli anywhere

**Prerequisites**
- [installed](https://nodejs.org/en/download/) `npm` and `node`
- [basic knowledge](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) of JavaScript
- [basic knowledge](https://expressjs.com/en/4x/api.html) of `express`

# Usage
just run

`servstub`

and you will cbe prompted to add endpoints. or, if you have a config file, run

`servstub path/to/configfile.js --port 4321`

and an api server will spin up on port `4321`. you can also write `-p 4321` or `--port=4321` for the same result. _specifying a port is optional_

# Configuration
you can either configure `servstub` with the [command line](#cli-configuration) or with a [file](#file-configuration)
## CLI Configuration
simply running `servstub` will put you in the configuration tool the available commands are:
#### add
add a new endpoint config, specifying method, then route, then response. rules [defined here](#endpoint_config-object) apply to the values of those properties.

ex: `add POST /data 201`
#### rm
remove an existing config by method and route.

ex: `rm POST /data`
#### port
specify the port on which you wish to run the server.

ex: `port 4321`
#### info
print the endpoints you've configured.

ex: `info`
#### start
start the server.

ex: `start`
#### quit
quit.

ex: `quit`

## File Configuration
basic rules:
1) you must create a config file for `servstub` to work
2) the config file must be a `.js` file with a default export
3) the export must be of type `Array`, where each item represents is an `endpoint_config`

([example](#example))

### endpoint_config object
an `endpoint_config` object has the following properties:
#### route (string/array, _required_)
defines valid route(s). if `route` is a string, it is passed as-is into `express` as a route. if `route` is an array of strings, each string is passed a new route.
#### method (string/array, _required_)
defines valid methods. if `method` is a string, it is passed as-is into `express` as a route. if `method` is an array of strings, each string is passed as a new method on a route.
#### response (number/function/response_config, _required_)
defines response. the following situations apply given the type of `response`:

**number**: if `response` is a number, the endpoint with return that number as the status code, with an empty reponse body

**response_config**: if `response` is an object, it must conform to the `response_config` schema

**function (ADVANCED)**: if `response` is a function, `express` will call that function with the [Request](https://expressjs.com/en/4x/api.html#req) and [Response](https://expressjs.com/en/4x/api.html#res) objects, as if you were defining a route manually. see [this documentation](https://expressjs.com/en/4x/api.html#req.route) for examples

### response_config object
an `endpoint_config` object has the following properties:
#### "body" (string/number/object, _required_)
this is the body of the response
#### "headers" (object)
an object that will extend the existing headers. default: `{}`
#### "status" (number)
the status code to send back with the response. default: `200`


### example
```
module.exports = [
    // creates a single endpoint
    // GET /foo
    // that returns a 200 OK with body { "answer": 42 }
    {
        route: '/foo',
        method: 'get',
        response: {
            'body': {
                'answer': 42
            },
            'status': 200
        }   
    },
    // creates six endpoints
    // GET /bar, POST /bar, DELETE /bar
    // GET /baz, POST /baz, DELETE /baz
    // all will return a 403 FORBIDDEN
    {
        route: ['/bar', '/baz'],
        method: ['get', 'post', 'delete'],
        response: 403
    },
    // creates a single endpoint
    // GET /echo
    // that returns whatever you put
    // the "message" query parameter
    {
        route: '/echo',
        method: 'get',
        response: (req, res) => res.send(req.query.message)
    }
];
```
