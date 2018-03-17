// This code can run in four different environments:
// A) In a Docker container
// B) In a Docker container running in a Kubernetes cluster
// C) In the cloud in a Cloud Foundry environment
// D) Standalone on an in-house machine.

// There are three possibilities for how credentials are available to this
// code:
// 1) They're environment variables, set outside this code before the
//    process starts (applies to environments A and B above)
// 2) They're available through the VCAP_SERVICES environment variable
//    provided by the Cloud Foundry runtime (environment C)
// 3) They're availble in the .env file in the current directory
//    (environment D).

// Obviously we want a single app that works in all of the combinations of
// environments and credentials. Sooooo, here's what we do:

// Check to see if the VCAP_SERVICES environment variable exists. This
// should only exist when running in the cloud in a Cloud Foundry
// environment (environment C).
// If there is no VCAP_SERVICES defined, we call the NPM dotenv package to
// read the .env file. We call the package so that it fails quietly if the
// .env file doesn't exist (environment D).
// If the environment variables we're looking for are already defined
// (environments A and B), VCAP_SERVICES won't be defined and the dotenv
// package doesn't overwrite them. (Most likely there is no .env file, but
// even if there is, it doesn't impact the environment variables).

// Look at VCAP_SERVICES if it exists. Note that this is JSON data.
if (process.env.VCAP_SERVICES) {
    process.env.CLOUDANT_URL = JSON.parse(process.env.VCAP_SERVICES)
                                   .cloudantNoSQLDB[0].credentials.url;
} else { // Otherwise look for .env, which is a file of name/value pairs
    require('dotenv').config({silent: true});
}

var url ='https://815b5ed3-a368-4187-822d-a44ac02baad4-bluemix:f9e969a258a436c91ede37fd494b3085a9ccfe81f853048a70fdd149f138e807@815b5ed3-a368-4187-822d-a44ac02baad4-bluemix.cloudant.com';

const port = process.env.PORT || 8080;

// Just hardcoding the database name, should probably be an env var
const dbname = 'guru';

// Credentials should be in order, so we're ready to go now. If not,
// this is going to fail pretty quickly.

var Cloudant = require('cloudant');
var cloudant, cloudantDB;

// Now open the database. If it doesn't exist, it is created. The URL
// for Cloudant is in the form https://user name:password@address, so
// we don't have to pass the username and password separately.
cloudant = Cloudant(process.env.CLOUDANT_URL);
cloudant.db.create(dbname);
cloudantDB = cloudant.use(dbname);

var cors = require('cors');

if (cloudantDB === null)
    console.warn('Could not find or create the database!');
else
    console.log('The database seems to be fine.');

// Use the common combination of Express, body-parser, and
// request to handle web traffic and requests.
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var alertnode = require('alert-node');
//var popup = require('popups');
// Create a new express server and set up the body-parser
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//app.use(cors({origin: '*'}));
// Serve HTML files out of ./public
app.use(express.static(__dirname + '/public'));

// Handle POST requests sent to the /registration URL. Note
// that the /public directory doesn't have anything that
// matches that name. /registration is the value of the
// action attribute on the <form> element in index.html.
app.post('/registration', function(req, res){
  // body-parser delivers the body of the request as a JSON
  // document (req.body), so just pass that on to Cloudant.
  cloudantDB.insert(req.body, function(err, body, header) {
    if (err) {
        console.log(`insert failed! ${err.message}`);
        res.status(500).send(err.message);
    } else {
        console.log('Registration successfully processed!');
    }
  });
  // Now redirect the user to the success page
  res.redirect("/registered.html");
});
app.get('/sel-tr', function(req, res){
  var webinar = require('cloudant-quickstart')(url, 'webinar');
  webinar.query({
   "selector": {
      "_id": {
         "$gt": "0"
      }
   },
   "fields": [
      "company"
   ]
})
  .then(function(data) {
    // success
    //console.log(data);

    res.send(data);
  })
  .catch(function(err) {
    // failure
    console.error(err);
  });
});
app.get('/t2', function(req, res){
var t3 = [{"company":"scxsc"},{"company":"scasc"},{"company":"xsaxas"}];
res.send(JSON.stringify(t3));

});

//Getting proper syllabus recommendations
app.get('/syllabus', function(req, res){
  var webinar = require('cloudant-quickstart')(url, 'guru');
  webinar.query({
   "selector": {
      "subdb": {
         "$like": "books"
      },
      "subject":{
        "$like": req.body.subject
      },
      "branch":{
        "$like": req.body.branch
      }
   }
})
  .then(function(data) {
    // success
    console.log(data);
    res.send(JSON.stringify(data));
  })
  .catch(function(err) {
    // failure
    console.error(err);
  });;

});

//Setting recommendation for books
app.post('/syllabus-recommend', function(req, res){
  // body-parser delivers the body of the request as a JSON
  // document (req.body), so just pass that on to Cloudant.
  cloudantDB.insert(req.body, function(err, body, header) {
    if (err) {
        console.log(`insert failed! ${err.message}`);
        res.status(500).send(err.message);
    } else {
        console.log('Syllabus recommendation successfully processed!');
        alertnode('Thank you, your Syllabus recommendation is successfully processed!');
    }
  });
  /*popup.alert({
    content: 'Thank you for suggesting books'
});
*/
  // Now redirect the user to the success page
  res.redirect("/syllabus-recommend.html");
});

// start server on the specified port
app.listen(port);
console.log(`Webinar registration server started on port ${port}....`);
