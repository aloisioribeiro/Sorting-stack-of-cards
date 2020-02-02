//////////////////////////////////////////////////
//
//   import core modules of NodeJS
//
const http = require('http');


//////////////////////////////////////////////////
//
//   import system's modules
//
const routes = require('./routes');


//////////////////////////////////////////////////
//
// global constants
const hostname = '127.0.0.1';
const port = 3000;


//////////////////////////////////////////////////
//
//   creation of a server instance
//
const server = http.createServer((req, res) => {
  routes.selectRoute(req, res);
});


//////////////////////////////////////////////////
//
//   Initializes the server to listen at port 3000
//
server.listen(port, '127.0.0.1', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
