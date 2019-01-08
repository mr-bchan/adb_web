var express = require('express');
var router = express.Router();

/* GET search page - '/' */
/* 
	Parameters:
	1. q <string> - html-escaped string
*/

router.get('/', function(req, res, next) {
  // get q parameter from url
  var query = req.query.q
  console.log('Received query request: ' + query)
  
  var title = 'Search | Asian Development Bank'
  var length = 9999 //dummy value
  
  // check if undefined, return to home
  if(query){
  	res.render('search', { title: title, query: query, length: length});
  }

  else{
  	res.render('index', { title: title});
  }
});

module.exports = router;