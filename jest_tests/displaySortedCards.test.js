//////////////////////////////////////////////////////////////////////
//
//   import the module to display the trip description
//
const f_displaySortedCards = require('../services/displaySortedCards');


//////////////////////////////////////////////////////////////////////
//
//   It tests if the description of the trip for a single card matches the expected result
//
test('sort a graph structure with a single card', () => {

  // input pre-defined
  let createdStructureOfCards_OneCard = {
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
        general_information_to: ''
      },
      Roma: { start: false, end: null, from: 'Berlin', to: null }
    },
    start_point: [ 'Berlin' ],
    end_point: [ 'Roma' ]
  };
  
  // calling the function from the module
  return f_displaySortedCards(createdStructureOfCards_OneCard, (trip_description) => {

    // expected output
    let expectedOfTripDescription = "<br><br>Take train Wagon 5, at Platform C3, from Berlin to Roma. Seat number 34.";

    // it compares the generated trip description with the expected one
    expect( trip_description ).toEqual( expectedOfTripDescription );
  });
    
});


//////////////////////////////////////////////////////////////////////
//
//   It tests if the description of the trip for two cards matches the expected result
//
test('sort a graph structure with two cards', () => {

  // input pre-defined
  let createdStructureOfCards_TwoCards = {
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
      Roma: { start: false, end: null, from: 'Berlin', to: null },
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
      }
    },
    start_point: [ 'Paris' ],
    end_point: [ 'Roma' ]
  };
  
  // calling the function from the module
  return f_displaySortedCards(createdStructureOfCards_TwoCards, (trip_description) => {

    // expected output
    let expectedOfTripDescription = "<br><br>Take the bus 9A, at Bus station - Platform 7, from Paris to Berlin. Seat number 23.<br><br>Take train Wagon 5, at Platform C3, from Berlin to Roma. Seat number 34.";

    // it compares the generated trip description with the expected one
    expect( trip_description ).toEqual( expectedOfTripDescription );
  });
    
});


//////////////////////////////////////////////////////////////////////
//
//   It tests if the description of the trip for seven cards matches the expected result
//
test('sort a graph structure with seven cards', () => {

  // input pre-defined
  let createdStructureOfCards_SevenCards = {
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
  
  // calling the function from the module
  return f_displaySortedCards(createdStructureOfCards_SevenCards, (trip_description) => {

    // expected output
    let expectedOfTripDescription = "<br><br>Take the bus 9A, at Bus station - Platform 7, from Paris to Berlin. Seat number 23.<br><br>Take train Wagon 5, at Platform C3, from Berlin to Roma. Seat number 34.<br><br>Take train Wagon 1, at Platform D, from Roma to Praga. Seat number 12.<br><br>From Praga airport, take flight LN357 to London. Seat number 45C. Baggage drop at ticket counter 344.<br><br>From London airport, take flight IST15 to Istanbul. Seat number 27B. Baggage will be automatically transferred from your last leg.<br><br>Take ferry SH3, at Pier 3, from Istanbul to Sochi. Seat number No seat assignment.<br><br>Take uber license plate y859ab75, at Port, from Sochi to Adler.";

    // it compares the generated trip description with the expected one
    expect( trip_description ).toEqual( expectedOfTripDescription );
  });
    
});
