var mysql = require('mysql');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var dbConnection = mysql.createConnection({
  user: "root",
  // password: "",
  database: "chatterbox"
});

dbConnection.connect();

// var idCounter = 1;
// var messages = [];

exports.sendResponse = sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(obj));
};

var collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};

exports.eventHandler = function(req, res) {
  console.log("Serving request type " + req.method + " for url " + req.url);

  switch(req.method){
    case 'GET':
      dbConnection.query( "SELECT * FROM messages INNER JOIN users on messages.userId = users.userId",
        function(err, results, fields) {
          if (err) console.log(err);
          sendResponse(res, results, 200);
      });
      break;
    case 'POST':
      collectData(req, function(data) {
        var message = JSON.parse(data);
        console.log(message.username);

        dbConnection.query( "SELECT userId FROM users WHERE username = ?", [message.username],
          function(err, results, fields) {
            if (err) console.log(err);
            if (results === undefined) {
              dbConnection.query( "INSERT INTO Users (username) values (?)", [message.username],
                function(err, results, fields) {
                  var timeStamp = new Date().getTime();
                  console.log(results.insertId);
                  dbConnection.query( "INSERT INTO Messages (text, roomname, userId, timestamp) values (?, ?, ?, ?)", [message.text, message.roomname, results[0].insertId, timeStamp],
                    function(err, results, fields) {
                      if (err) console.log(err);
                  });
              });
            } else {
              var timeStamp = new Date().getTime();
              dbConnection.query( "INSERT INTO Messages (text, roomname, userId, timestamp) values (?, ?, ?, ?)", [message.text, message.roomname, results[0].userId, timeStamp],
                function(err, results, fields) {
                  if (err) console.log(err);
              });
            }
        });

        // idCounter++;
        // message.objectId = idCounter;
        // message.createdAt = new Date();
        // messages.unshift(message);
        sendResponse(res, {}, 201);
      });
      break;
    case 'OPTIONS':
      sendResponse(res, null);
      break;
    default:
      // handle error
      sendResponse(res, null, 501); // return response 'Method Not Implemented'
      break;
  }
};
