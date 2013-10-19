var mysql = require('mysql');
var http = require("http");
var url = require("url");
var fs = require("fs");
var messageHandler = require("./request-handler");

var port = 8080;

var ip = "127.0.0.1";

var server = http.createServer(messageHandler.eventHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  // password: "",
  database: "chatterbox"
});

// var queryString = "SELECT * FROM Messages INNER JOIN Users ON Messages.userId = Users.userId";
// var queryArgs = [];

// dbConnection.query( queryString, queryArgs,
//   function(err, results, fields) {
//     if (err) console.log(err);
//     console.log(results);
// });

// dbConnection.query( "SELECT userId FROM Users WHERE users.username = ?", ['anon'],
//   function(err, results, fields) {
//     if (err) console.log(err);
//     console.log(results);
// });

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
