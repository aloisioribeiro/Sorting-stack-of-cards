//////////////////////////////////////////////////
//
//   import system's modules

const f_readCardsStack = require('./services/readCardsStack');
const f_createGraphStructure = require('./services/createGraphStructure');
const f_displaySortedCards = require('./services/displaySortedCards');


exports.processListOfCards = function (req, callback) {

  let response = {
    error : null,
    description : null
  };
  
  f_readCardsStack(req, (err, stackList) => {
    if (err) {
      response.error = "There is a problem with the content of the body field in the request object";
      callback(response.error, response.description);
    }
    else {

      f_createGraphStructure(stackList, function (err, createdStructureOfCards) {
      
        if (err) {
          response.error = err.error;
          callback(response.error, response.description);
        }
        else {
          //   createdStructureOfCards = {
          //      "graph"      : stackCards,
          //      "start_point": start_point,
          //      "end_point"  : end_point
          //   }

          f_displaySortedCards(createdStructureOfCards, (trip_description) => {

            response.description = trip_description;
            callback(null, response.description);
        
          });
        }
      });
    }
  });
};
