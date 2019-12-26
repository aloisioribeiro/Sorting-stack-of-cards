// import core modules of NodeJS
const http = require('http');
const fs = require('fs');

// import system's modules
const service = require('./service');


// global constants
const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req, res) => {


  //////////////////////////////////////////////////////////////////////
  //
  //   method.....: GET
  //   url........: /
  //   description: url for the main page with a form to add boarding cards to the stack
  //
  if (req.url === '/') {//.

    let localPath = __dirname + '/public/index.html';

    fs.readFile(localPath, function(err, HTML_File) {
      if (!err) {
        res.writeHead(200, {
          'Content-Type':'text/html'
        });
        res.write(HTML_File);
        res.end();
      }
      else {  // there is a problem in the server
        res.writeHead(500);
        res.end();
      }
    });
  }

  
  
  //////////////////////////////////////////////////////////////////////
  //
  //   method.....: POST
  //   url........: /api/sortStack
  //   description: api endpoint that receives a stack of boarding cards
  //
  else if (req.method === 'POST' && req.url === '/api/sortStack') {
    service.readCardsStack(req, res, (err, stackStructure) => {
      if (err) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({"error" : "the card list is not a valid sequence"}));
      }
      else {
        service.sortCards(stackStructure, (trip_description) => {

          let HTML_page = "<!DOCTYPE html>" +
                          "<html>" +
                          "<head>" +
                          "<title>Travel sorting</title>" +
                          "</head>" +
                          "<body>" +
                          trip_description +
                          "</body>" +
                          "</html>";

            
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(HTML_page);
        });
      }
    });
  }



  //////////////////////////////////////////////////////////////////////
  //
  //   Possible future implementations
  //

  
  //////////////////////////////////////////////////////////////////////
  //
  //   method.....: POST
  //   url........: /api/user
  //   description: api endpoint to add users
  //
  //   else if (req.method === 'POST' && req.url === '/api/user') { ... }

  
  //////////////////////////////////////////////////////////////////////
  //
  //   method.....: GET
  //   url........: /api/user/:id/trips
  //   description: api endpoint to retrieve list of trips of an user
  //
  //   else if (req.method === 'GET' && req.url === '/api/user/:id/trips') { ... }
  
  
  //////////////////////////////////////////////////////////////////////
  //
  //   method.....: GET
  //   url........: /api/place/:id/trips
  //   description: api endpoint to retrieve list of trips that include the specified place
  //
  //   else if (req.method === 'GET' && req.url === '/api/place/:id/trips') { ... }

  
  
  //////////////////////////////////////////////////////////////////////
  //
  //   method.....: any
  //   url........: any url that not matches the previous ones specified
  //   description: return a fail page
  //
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found\n');
  }
});




  //////////////////////////////////////////////////
  //
  //   Initializes the server to listen at port 3000
  //
server.listen(port, '127.0.0.1', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

