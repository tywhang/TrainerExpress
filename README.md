TrainerExpress
==============

Personal circuit trainer application where users can create their own routines and run them like a trainer.

Technologies Used
=================
Node, Express, Angular, and MongoDB


Code Architecture
=================

Flow Chart
----------

[app.js (Angular routes)]

-> [views/ (Angular)] 

-> [controllers/ (Angular)]

-> [routes [Express]] 

-> [controllers/ (Express)] 

-> [models/ [Mongoose]] 

-> [MongoDB (NoSQL DB)]

To avoid confusion, the node app.js file is renamed: server.js



English Explanation of architecture
-----------------------------------

URL is read by app.js, which renders the corresponding partial in the views folder.

Functionality within each view is handled by the containing controller. 

Communication to the back-end is delegated the factories.

Factories make Ajax requests ($http) to the back-end where the routes file directs them to the proper controller.

The controller utilizes the mongoose library to communicate with MongoDB and send a response back to the front end.
