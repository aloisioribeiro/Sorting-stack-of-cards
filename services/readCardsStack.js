//////////////////////////////////////////////////
//
//   name: readCardsStack
//
//   description: read the content of the body field received in the req (request) object
//
//   result expected:
//
//                      [
//                          {
//                              departure: 'Berlin',
//                              destination: 'Roma',
//                              baggage: '',
//                              transport: {
//                                              type: 'train',
//                                              departure_point: 'Platform C3',
//                                              arrival_point: '',
//                                              flight_wagon_ferry__number: 'Wagon 5',
//                                              seat: '34'
//                              },
//                              general_information: ''
//                          },
//                          
//                          ...
//                          
//                          {
//                              departure: 'Praga',
//                              destination: 'London',
//                              baggage: 'Baggage drop at ticket counter 344',
//                              transport: {
//                                              type: 'airplane',
//                                              departure_point: 'Gate 22',
//                                              arrival_point: '',
//                                              flight_wagon_ferry__number: 'LN357',
//                                              seat: '45C'
//                              },
//                              general_information: ''
//                          }
//                      ]


module.exports = function (req, callback) {
  // Reading the body of the request with the not-sorted stack of cards

  let body = '';

  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    try {
      let stackCards = JSON.parse(body);
      callback(null, stackCards);
    }
    catch (e) {
      callback(e, null);
    }
  });
};
