//////////////////////////////////////////////////
//
//   name: displaySortedCards
//
//   description: display a list os phrases describing the full trip from one place to another
//
//   result expected:
//
//
//
//
//


module.exports = function (stackStructure, callback) {
  let description = '';
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



// Display de description of each part of the trip. The function is called recursively until the end of the sorted cards

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
