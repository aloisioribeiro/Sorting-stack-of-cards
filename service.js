exports.readCardsStack = function (req, res, callback) {

  // Reading the body of the request with the not-sorted stack of cards

  let body = '';

  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {

    let stackCards = JSON.parse(body);

    createStructure(stackCards, function (err, createdStructureOfCards) {
      if (err) {
        callback(err, "a lista de cartoes nao forma uma sequencia continua");
      }
      else {
        //   createdStructureOfCards = {
        //      "graph"      : stackCards,
        //      "start_point": start_point,
        //      "end_point"  : end_point
        //   }
        callback(null, createdStructureOfCards);
      }
    });
  });
};





  //////////////////////////////////////////////////////////////////////
  //
  //   description: creates a structure (graph) that will be used to define
  //                if the stack of cards make a linear sequence, and to
  //                identify the starting point and ending point of the trip
  //
  //   start_point: auxiliar list that will store possible cities to be the start point of the trip.
  //                At the end of the execution there might be only one city stored
  //
  //   end_point..: auxiliar list that will store possible cities to be the end point of the trip.
  //                At the end of the execution there might be only one city stored
  //
  //   response...: object that represents the graph indicating the routes of each card
  //
  //                {
  //                   "place_name_1": {
  //                                     start  : [boolean],   if false, it indicates that "place_name_1" is not the beginning point of the trip
  //                                     end    : [boolean],   if false, it indicates that "place_name_1" is not the beginning point of the trip
  //                                     from   : [string],     previous place visited before "place_name_1"
  //                                     to     : [string],     destination of the card from "place_name_1"
  //                                     baggage_to   : [object],     information about the baggage in the route from "place_name_1"
  //                                     transport_to   : [object],     information about the transport used in the route
  //                                     general_information_to: [string]   other extra general information
  //                   },
  //                   "place_name_2": {
  //
  //                       ...
  //
  //                   }
  //                }

function createStructure(stack, callbackSorted) {
  response = {};
  let start_point = [];
  let end_point = [];
  let error_loop = false;
  
  for (let i = 0; i < stack.length; ++i) {
    // => analizing the departure point of the card

    // = when the departure point was not included yet, execute normal inclusion
    if (response[stack[i].departure] == undefined) {
      // add a departure place;
      response[stack[i].departure] = {start: null, end: false, from: null, to: stack[i].destination,
           baggage_to: stack[i].baggage, transport_to: stack[i].transport, general_information_to: stack[i].general_information};
      // this departure point is a possible beginning for the trip
      start_point.push( stack[i].departure );

      // -> analizing the destination point of the card

      // - when the destination point was not included yet, execute normal inclusion
      if (response[stack[i].destination] == undefined) {
        // add a destination place;
        response[stack[i].destination] = {start: false, end: null, from: stack[i].departure, to: null};
        // this destination point is a possible ending for the trip
        end_point.push( stack[i].destination );
      }

      // - if the destination point of the card already exists, created as a departure point
      // it cannot be a possible ending of the trip.
      else if (response[stack[i].destination].start == null  &&  response[stack[i].destination].end == false) {
        response[stack[i].destination].start = false;
        response[stack[i].destination].from = stack[i].departure;
        
        // this destination point is also a departure point (in another card) and cannot be the trip beginning
        let position = start_point.indexOf(stack[i].destination);
        if (position != -1) {   // if this destination was already added to possible begin, it must be removed
          start_point.splice(position, 1);
        }
        // this destination point is also a departure point (in another card) and cannot be the trip ending
        position = end_point.indexOf(stack[i].destination);
        if (end_point.indexOf(stack[i].destination) != -1) {   // if this departure_point was already added to possible begin, it must be removed
          end_point.splice(position, 1);
        }
      }
      
      // - if the destination point of the card already exists, created as a destination point,
      // there is a loop in the cards, that is not treated at the moment without date/time
      // information about the departures and arrives
      else {
        error_loop = true;
        break;
      }
    }

    
    // => continue analizing the departure point of the card
    
    // = if the departure point of the card already exists, created as a destination point
    else if (response[stack[i].departure].start == false  &&  response[stack[i].departure].end == null) {
      response[stack[i].departure].to = stack[i].destination;
      response[stack[i].departure].end = false;      
      response[stack[i].departure].baggage_to = stack[i].baggage;
      response[stack[i].departure].transport_to = stack[i].transport;
      response[stack[i].departure].general_information_to = stack[i].general_information;

      // this departure point is also a destination point (in another card) and cannot be the trip beggining
      let position = start_point.indexOf(stack[i].departure);
      if (position != -1) {   // if this departure_point was already added to possible begin, it must be removed
        start_point.splice(position, 1);
      }
      // this departure point is also a destination point (in another card) and cannot be the trip ending
      position = end_point.indexOf(stack[i].departure);
      if (end_point.indexOf(stack[i].departure) != -1) {   // if this departure_point was already added to possible begin, it must be removed
        end_point.splice(position, 1);
      }

      

      // -> analizing the destination point of the card
      // - when the destination point was not included yet, execute normal inclusion
      if (response[stack[i].destination] == undefined) {
        // add a destination place;
        response[stack[i].destination] = {start: false, end: null, from: stack[i].departure, to: null};
        // this destination point is a possible ending for the trip
        end_point.push( stack[i].destination );
      }

      // - if the destination point of the card already exists, created as a departure point
      // it cannot be a possible ending of the trip.
      else if (response[stack[i].destination].start == null  &&  response[stack[i].destination].end == false) {
        response[stack[i].destination].start = false;
        response[stack[i].destination].from = stack[i].departure;
        
        // this destination point is also a departure point (in another card) and cannot be the trip beginning
        let position = start_point.indexOf(stack[i].destination);
        if (position != -1) {   // if this destination was already added to possible begin, it must be removed
          start_point.splice(position, 1);
        }
        // this destination point is also a departure point (in another card) and cannot be the trip ending
        position = end_point.indexOf(stack[i].destination);
        if (end_point.indexOf(stack[i].destination) != -1) {   // if this departure_point was already added to possible begin, it must be removed
          end_point.splice(position, 1);
        }
      }

      // - if the destination point of the card already exists, created as a destination point,
      // there is a loop in the cards, that is not treated at the moment without date/time
      // information about the departures and arrives
      else {
        error_loop = true;
        break;
      }

      
    }
    
    // - if the departure point of the card already exists, created as a departure point,
    // there is a loop in the cards, that is not treated at the moment without date/time
    // information about the departures and arrives
    else {
      error_loop = true;
      break;
    }
  }
  callbackSorted(error_loop, {"graph": response, "start_point": start_point, "end_point": end_point});
}




exports.sortCards = function (stackStructure, callback) {
  let description = '';

  //console.log();
  //console.log(stackStructure);
  //console.log();
  // Describing the trip:

  //   stackStructure = {
  //      "graph"      : stackCards,
  //      "start_point": start_point,
  //      "end_point"  : end_point
  //   }
  
  display(description, stackStructure.graph, stackStructure.start_point[0], stackStructure.end_point[0], function(description2) {
    callback(description2);
  });
  
};




function display(description, graph, start_point, final_end_point, callback) {

  // BUS
  if (graph[start_point].transport_to.type == "bus") {
    description += "<br><br>Take the bus";
    if (graph[start_point].transport_to.flight_wagon_ferry__number != "") {
      description += " " + graph[start_point].transport_to.flight_wagon_ferry__number;
    }
    if (graph[start_point].transport_to.departure_point != "") {
      description += ", at " + graph[start_point].transport_to.departure_point;
    }
    description += ", from " + start_point + " to " + graph[start_point].to + ".";
    if (graph[start_point].transport_to.seat != "") {
      description += " Seat number " + graph[start_point].transport_to.seat + ".";
    }
    if (graph[start_point].baggage_to != "") {
      description += " " + graph[start_point].baggage_to + ".";
    }
  }
  
  // AIRPLANE
  else if (graph[start_point].transport_to.type == "airplane") {
    description += "<br><br>From " + start_point + " airport, take flight " + graph[start_point].transport_to.flight_wagon_ferry__number +
                   " to " + graph[start_point].to + ". Seat number " + graph[start_point].transport_to.seat + ". " +
                   graph[start_point].baggage_to + ".";
  }
  
  // TRAIN
  else if (graph[start_point].transport_to.type == "train") {
    description += "<br><br>Take train";
    if (graph[start_point].transport_to.flight_wagon_ferry__number != "") {
      description += " " + graph[start_point].transport_to.flight_wagon_ferry__number;
    }
    if (graph[start_point].transport_to.departure_point != "") {
      description += ", at " + graph[start_point].transport_to.departure_point;
    }
    description += ", from " + start_point + " to " + graph[start_point].to + ".";
    if (graph[start_point].transport_to.seat != "") {
      description += " Seat number " + graph[start_point].transport_to.seat+ ".";
    }
    if (graph[start_point].baggage_to != "") {
      description += " " + graph[start_point].baggage_to + ".";
    }
  }
  
  // FERRY
  else if (graph[start_point].transport_to.type == "ferry") {
    description += "<br><br>Take ferry";
    if (graph[start_point].transport_to.flight_wagon_ferry__number != "") {
      description += " " + graph[start_point].transport_to.flight_wagon_ferry__number;
    }
    if (graph[start_point].transport_to.departure_point != "") {
      description += ", at " + graph[start_point].transport_to.departure_point;
    }
    description += ", from " + start_point + " to " + graph[start_point].to + ".";
    if (graph[start_point].transport_to.seat != "") {
      description += " Seat number " + graph[start_point].transport_to.seat + ".";
    }
    if (graph[start_point].baggage_to != "") {
      description += " " + graph[start_point].baggage_to + ".";
    }
  }
  
  // OTHER TRANSPORT TYPE
  else {
    if (graph[start_point].transport_to.type != "") {
      description += "<br><br>Take " + graph[start_point].transport_to.type;
    }
    if (graph[start_point].transport_to.flight_wagon_ferry__number != "") {
      description += " " + graph[start_point].transport_to.flight_wagon_ferry__number;
    }
    if (graph[start_point].transport_to.departure_point != "") {
      description += ", at " + graph[start_point].transport_to.departure_point;
    }
    description += ", from " + start_point + " to " + graph[start_point].to + ".";
    if (graph[start_point].transport_to.seat != "") {
      description += " Seat number " + graph[start_point].transport_to.seat + ".";
    }
    if (graph[start_point].baggage_to != "") {
      description += " " + graph[start_point].baggage_to + ".";
    }
  }

  let string1 = graph[start_point].to;
  let string2 = final_end_point;
  
  if (string1  ==  string2) {
    // the stack of cards is completed
    callback(description);
  }
  else {
    // move to read the next card
    display(description, graph, graph[start_point].to, final_end_point, function(description2) {
      callback(description2);
    });
  }
}
