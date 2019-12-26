# Sorting-stack-of-cards
Server API to sort stack of cards


- STARTING

To start the server, it is necessary to have NodeJS installed in the computer.
Then run

> node app.js

The prompt will show the message

> Server running at http://127.0.0.1:3000/





- ENDPOINT TO SORT STACK OF CARDS

Method: POST

Url: http://localhost:3000/api/sortStack

body:
Using, for example, the app Postman on Chrome Browser, set the body to "raw" and "JSON(application/json)

The body content is a list of cards.

Each card has the following structure:

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

There are 4 types of transport already defined: bus, airplane, train and ferry.
Other types of transport can be used though.

The folder "examples" contains a file ("input_example.txt") with a complete body content for the following stack of cards:

    Berlin   ->  Roma     (train)
    Praga    ->  London   (airplane)
    Paris    ->  Berlin   (bus)
    Sochi    ->  Adler    (uber)
    London   ->  Istanbul (airplane)
    Istanbul ->  Sochi    (ferry)
    Roma     ->  Praga    (train)




- RESPONSE

The response for the previous example will be:

----------

Take the bus 9A, at Bus station - Platform 7, from Paris to Berlin. Seat number 23.
Take train Wagon 5, at Platform C3, from Berlin to Roma. Seat number 34.
Take train Wagon 1, at Platform D, from Roma to Praga. Seat number 12.
From Praga airport, take flight LN357 to London. Seat number 45C. Baggage drop at ticket counter 344.
From London airport, take flight IST15 to Istanbul. Seat number 27B. Baggage will be automatically transferred from your last leg.
Take ferry SH3, at Pier 3, from Istanbul to Sochi. Seat number No seat assignment.
Take uber license plate y859ab75, at Port, from Sochi to Adler.

----------




- THE SORTING PROCESS

The sorting process is done by the use of a graph structure, and two auxiliar variables to identify the first origin and the last destination.





- FUTURE IMPLEMENTATIONS

A form web page that will make easier the input of the cards and the stack of cards. A very begining scratch can be seen in the file "public/index.html", and accessed the "/" end point

Method: GET
Url: http://localhost:3000/

The system doesn't deal with situations when a city is visited more than once, and with situations where the cards in the stack don't represent a linear sequence.
