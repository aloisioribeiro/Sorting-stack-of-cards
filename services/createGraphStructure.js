//////////////////////////////////////////////////
//
//   name: createGraphStructure
//
//   description: creates a structure (graph) that indicates the connection between two places,
//                and it will also be used to define if the stack of cards make a linear sequence,
//                and identify the starting point and ending point of the trip
//
//   start_point: auxiliar list that will store possible cities to be the start point of the trip.
//                At the end of the execution there might be only one city stored
//
//   end_point..: auxiliar list that will store possible cities to be the end point of the trip.
//                At the end of the execution there might be only one city stored
//
//   response...: object that represents the graph indicating the routes of each card
//
//
//
//                      Concept:
//
//
//                      graph = {
//                                 "from_A" : {  destination_X  },
//                                 "from_B" : {  destination_Y  },
//
//                                 ...
//
//                                 "from_C" : {  destination_Z  }
//                      }
//
//
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

module.exports = function (stack, callbackSorted) {
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
  if (start_point.length > 1 || end_point.length > 1) {
    callbackSorted({error: "The list of cards does not form a valid sequence!"}, null);
  }
  else {
    callbackSorted(error_loop, {"graph": response, "start_point": start_point, "end_point": end_point});
  }
}
