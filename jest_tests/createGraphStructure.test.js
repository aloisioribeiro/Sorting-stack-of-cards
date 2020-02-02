//////////////////////////////////////////////////////////////////////
//
//   import the module to create a graph structure
//
const f_createGraphStructure = require('../services/createGraphStructure');


//////////////////////////////////////////////////////////////////////
//
//   It tests the criation of the graph for a single card
//
test('create a graph structure from a single card', () => {

  // input pre-defined
  let stackList_OneCard = [
    {
      "departure" : "Berlin",
      "destination" : "Roma",
      "baggage" : "",
      "transport" : {
        "type" : "train",
        "departure_point" : "Platform C3",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "Wagon 5",
        "seat" : "34"
      },
      "general_information" : ""
    }
  ];

  // calling the function from the module
  return f_createGraphStructure(stackList_OneCard, (err, createdStructureOfCards) => {

    // expected output
    let expectedStructureOfCards = {
      graph: {
        Berlin: {
          start: null,
          end: false,
          from: null,
          to: 'Roma',
          baggage_to: '',
          transport_to: {
            type: 'train',
            departure_point: 'Platform C3',
            arrival_point: '',
            flight_wagon_ferry__number: 'Wagon 5',
            seat: '34'
          },
          general_information_to: '' },
        Roma: {
          start: false,
          end: null,
          from: 'Berlin',
          to: null
        }
      },
      start_point: [ 'Berlin' ],
      end_point: [ 'Roma' ]
    };

    // it compares the created graph structure with the expected one
    expect( createdStructureOfCards ).toEqual( expectedStructureOfCards );
    
  });
    
});


//////////////////////////////////////////////////////////////////////
//
//   It tests the criation of the graph for a stack with two cards
//
test('create a graph structure from a stack with two cards', () => {

  // input pre-defined
  let stackList_TwoCards = [
    {
      "departure" : "Berlin",
      "destination" : "Roma",
      "baggage" : "",
      "transport" : {
        "type" : "train",
        "departure_point" : "Platform C3",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "Wagon 5",
        "seat" : "34"
      },
      "general_information" : ""
    },
    {
      "departure" : "Paris",
      "destination" : "Berlin",
      "baggage" : "",
      "transport" : {
        "type" : "bus",
        "departure_point" : "Bus station - Platform 7",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "9A",
        "seat" : "23"
      },
      "general_information" : ""
    }
  ];
  
  // calling the function from the module
  return f_createGraphStructure(stackList_TwoCards, (err, createdStructureOfCards) => {

    // expected output
    let expectedStructureOfCards = {
      graph:  {
        Berlin:  {
          start: false,
          end: false,
          from: 'Paris',
          to: 'Roma',
          baggage_to: '',
          transport_to: {
            type: 'train',
            departure_point: 'Platform C3',
            arrival_point: '',
            flight_wagon_ferry__number: 'Wagon 5',
            seat: '34'
          },
          general_information_to: ''
        },
        Roma: { start: false, end: null, from: 'Berlin', to: null },
        Paris:  {
          start: null,
          end: false,
          from: null,
          to: 'Berlin',
          baggage_to: '',
          transport_to: {
            type: 'bus',
            departure_point: 'Bus station - Platform 7',
            arrival_point: '',
            flight_wagon_ferry__number: '9A',
            seat: '23'
          },
          general_information_to: ''
        }
      },
      start_point: [ 'Paris' ],
      end_point: [ 'Roma' ]
    };
    
    // it compares the created graph structure with the expected one
    expect( createdStructureOfCards ).toEqual( expectedStructureOfCards );
    
  });
    
});


//////////////////////////////////////////////////////////////////////
//
//   It tests the criation of the graph for a stack with seven cards
//
test('create a graph structure from a stack with seven cards', () => {

  // input pre-defined
  let stackList_SevenCards = [
    {
      "departure" : "Berlin",
      "destination" : "Roma",
      "baggage" : "",
      "transport" : {
        "type" : "train",
        "departure_point" : "Platform C3",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "Wagon 5",
        "seat" : "34"
      },
      "general_information" : ""
    },
    {
      "departure" : "Praga",
      "destination" : "London",
      "baggage" : "Baggage drop at ticket counter 344",
      "transport" : {
        "type" : "airplane",
        "departure_point" : "Gate 22",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "LN357",
        "seat" : "45C"
      },
      "general_information" : ""
    },
    {
      "departure" : "Paris",
      "destination" : "Berlin",
      "baggage" : "",
      "transport" : {
        "type" : "bus",
        "departure_point" : "Bus station - Platform 7",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "9A",
        "seat" : "23"
      },
      "general_information" : ""
    },
    {
      "departure" : "Sochi",
      "destination" : "Adler",
      "baggage" : "",
      "transport" : {
        "type" : "uber",
        "departure_point" : "Port",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "license plate y859ab75",
        "seat" : ""
      },
      "general_information" : ""
    },
    {
      "departure" : "London",
      "destination" : "Istanbul",
      "baggage" : "Baggage will be automatically transferred from your last leg",
      "transport" : {
        "type" : "airplane",
        "departure_point" : "Gate 15B",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "IST15",
        "seat" : "27B"
      },
      "general_information" : ""
    },
    {
      "departure" : "Istanbul",
      "destination" : "Sochi",
      "baggage" : "",
      "transport" : {
        "type" : "ferry",
        "departure_point" : "Pier 3",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "SH3",
        "seat" : "No seat assignment"
      },
      "general_information" : ""
    },
    {
      "departure" : "Roma",
      "destination" : "Praga",
      "baggage" : "",
      "transport" : {
        "type" : "train",
        "departure_point" : "Platform D",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "Wagon 1",
        "seat" : "12"
      },
      "general_information" : ""
    }
  ];
  
  // calling the function from the module
  return f_createGraphStructure(stackList_SevenCards, (err, createdStructureOfCards) => {

    // expected output
    let expectedStructureOfCards = {
      graph: {
        Berlin: {
          start: false,
          end: false,
          from: 'Paris',
          to: 'Roma',
          baggage_to: '',
          transport_to: {
            type: 'train',
            departure_point: 'Platform C3',
            arrival_point: '',
            flight_wagon_ferry__number: 'Wagon 5',
            seat: '34'
          },
          general_information_to: ''
        },
        Roma: {
          start: false,
          end: false,
          from: 'Berlin',
          to: 'Praga',
          baggage_to: '',
          transport_to: {
            type: 'train',
            departure_point: 'Platform D',
            arrival_point: '',
            flight_wagon_ferry__number: 'Wagon 1',
            seat: '12'
          },
          general_information_to: ''
        },
        Praga: {
          start: false,
          end: false,
          from: 'Roma',
          to: 'London',
          baggage_to: 'Baggage drop at ticket counter 344',
          transport_to: {
            type: 'airplane',
            departure_point: 'Gate 22',
            arrival_point: '',
            flight_wagon_ferry__number: 'LN357',
            seat: '45C'
          },
          general_information_to: ''
        },
        London: {
          start: false,
          end: false,
          from: 'Praga',
          to: 'Istanbul',
          baggage_to: 'Baggage will be automatically transferred from your last leg',
          transport_to: {
            type: 'airplane',
            departure_point: 'Gate 15B',
            arrival_point: '',
            flight_wagon_ferry__number: 'IST15',
            seat: '27B'
          },
          general_information_to: ''
        },
        Paris: {
          start: null,
          end: false,
          from: null,
          to: 'Berlin',
          baggage_to: '',
          transport_to: {
            type: 'bus',
            departure_point: 'Bus station - Platform 7',
            arrival_point: '',
            flight_wagon_ferry__number: '9A',
            seat: '23'
          },
          general_information_to: ''
        },
        Sochi: {
          start: false,
          end: false,
          from: 'Istanbul',
          to: 'Adler',
          baggage_to: '',
          transport_to: {
            type: 'uber',
            departure_point: 'Port',
            arrival_point: '',
            flight_wagon_ferry__number: 'license plate y859ab75',
            seat: ''
          },
          general_information_to: ''
        },
        Adler: { start: false, end: null, from: 'Sochi', to: null },
        Istanbul: {
          start: false,
          end: false,
          from: 'London',
          to: 'Sochi',
          baggage_to: '',
          transport_to: {
            type: 'ferry',
            departure_point: 'Pier 3',
            arrival_point: '',
            flight_wagon_ferry__number: 'SH3',
            seat: 'No seat assignment'
          },
          general_information_to: ''
        }
      },
      start_point: [ 'Paris' ],
      end_point: [ 'Adler' ]
    };
    
    // it compares the created graph structure with the expected one
    expect( createdStructureOfCards ).toEqual( expectedStructureOfCards );
    
  });
    
});


//////////////////////////////////////////////////////////////////////
//
//   It tests the criation of the graph for a stack with no valid sequence of cards
//
test('create a graph structure from a not valid sequence of cards', () => {

  // input pre-defined
  let stackList_SixCardsNotValidSequence = [
    {
      "departure" : "Berlin",
      "destination" : "Roma",
      "baggage" : "",
      "transport" : {
        "type" : "train",
        "departure_point" : "Platform C3",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "Wagon 5",
        "seat" : "34"
      },
      "general_information" : ""
    },
    {
      "departure" : "Paris",
      "destination" : "Berlin",
      "baggage" : "",
      "transport" : {
        "type" : "bus",
        "departure_point" : "Bus station - Platform 7",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "9A",
        "seat" : "23"
      },
      "general_information" : ""
    },
    {
      "departure" : "Sochi",
      "destination" : "Adler",
      "baggage" : "",
      "transport" : {
        "type" : "uber",
        "departure_point" : "Port",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "license plate y859ab75",
        "seat" : ""
      },
      "general_information" : ""
    },
    {
      "departure" : "London",
      "destination" : "Istanbul",
      "baggage" : "Baggage will be automatically transferred from your last leg",
      "transport" : {
        "type" : "airplane",
        "departure_point" : "Gate 15B",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "IST15",
        "seat" : "27B"
      },
      "general_information" : ""
    },
    {
      "departure" : "Istanbul",
      "destination" : "Sochi",
      "baggage" : "",
      "transport" : {
        "type" : "ferry",
        "departure_point" : "Pier 3",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "SH3",
        "seat" : "No seat assignment"
      },
      "general_information" : ""
    },
    {
      "departure" : "Roma",
      "destination" : "Praga",
      "baggage" : "",
      "transport" : {
        "type" : "train",
        "departure_point" : "Platform D",
        "arrival_point" : "",
        "flight_wagon_ferry__number" : "Wagon 1",
        "seat" : "12"
      },
      "general_information" : ""
    }
  ];
  
  // calling the function from the module
  return f_createGraphStructure(stackList_SixCardsNotValidSequence, (err, createdStructureOfCards) => {

    // expected output
    let expectedStructureOfCards = null;
    
    // it compares the created graph structure with the expected one
    expect( createdStructureOfCards ).toEqual( expectedStructureOfCards );
    // it compares the error message for a invalid list of cards
    expect( err ).toEqual( {error: "The list of cards does not form a valid sequence!"} );
    
  });
    
});
