var express = require('express')
, routes = require('routes')
, http = require('http')
, path = require('path')
, mysql = require('mysql')
, bodyParser = require('body-parser');

var global_config = require('./configuration.js'),
   serverEmitter = require('./emitters.js'),
   app = express();

/* CORS middleware */
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
};

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(allowCrossDomain);

// development only
//if ('development' == app.get('env')) {
// app.use(express.errorHandler());
//}

// Send parameters to MySQL Server
var dbconnection = mysql.createConnection({
  host:global_config.db_host,
  user: global_config.db_user,
  password: global_config.db_pass,
  database: global_config.db_name
});

// Check for an errors at the time of sending parameters
dbconnection.on( "error", function(error){
    console.log( "ERROR: " + error );
});

//Establish connection with MySQL
dbconnection.connect(function(error){
    if (error){
    console.log( "Error on connect: " + error);
    }
});

// Add send sms route
/*
app.get('/sendSMS/:message',function(req,res){
  serverEmitter.emit("sendSMSMsg", req.params.message);
  console.log("Emitted sendSMSMsg from server.");
  res.end("SMS Sent.");
});*/


/* Table : SMS,
   Query: insert into sms values ('Hello Wolrd');
   @params: message (string) to be sent as SMS. */
app.post('/sendSMS', function(req,res){
  console.log('POST /sendSMS, params: ' + req.body.message);
  var query = 'insert into sms values ("' + req.body.message + '");';

  dbconnection.query(query, function(err) {
	  if (err !== null) {
	    res.end("Query error:" + err);
	  }

		/* message is saved in db, now we send SMS */
		res.end("SMS Sent.");
	});

});

// Send query to MySQL DB on request
app.get('/:table',function(req, res){
  console.log('table man');
  var query='SELECT * FROM ' + req.params.table;
  dbconnection.query(query, function(err, rows, fields)
  {
    console.log('rows', rows);
    // There was an error or not?
    if(err != null)
    {
      res.end("Query error:" + err);
    }
    else
    {
      res.end("items :"+rows[0].items+"\nPrice :"+rows[0].price);
    }
  });
});

function serverStart() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}

exports.start = serverStart;
