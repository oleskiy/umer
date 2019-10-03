var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');


var connection = mysql.createConnection({
  host     : 'localhost',
  port: 3306,
 
	user     : 'root',
	password : '0524083393',
	database : 'nodelogin'
});

var app = express();
app.use(logger('dev'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/routes/login.html'));
});
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
  console.log(username+" p "+password);
  console.log(connection);
	if (username && password) {

    
   



		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      console.log(results);
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
app.listen(3001);