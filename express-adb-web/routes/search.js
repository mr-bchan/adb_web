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
  var length = 'XXXXX' //dummy value
  var data = [
  	{
  		'project_no': '123456',
  		'country': 'Lorem ipsum dolor',
  		'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  		'title': 'Aenean commodo ligula eget dolor'
  	},

   	{
  		'project_no': '123456',
  		'country': 'Lorem ipsum dolor',
  		'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  		'title': 'Aenean commodo ligula eget dolor'
  	},

   	{
  		'project_no': '123456',
  		'country': 'Lorem ipsum dolor',
  		'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  		'title': 'Aenean commodo ligula eget dolor'
  	},
  	
  	{
  		'project_no': '123456',
  		'country': 'Lorem ipsum dolor',
  		'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  		'title': 'Aenean commodo ligula eget dolor'
  	},

   	{
  		'project_no': '123456',
  		'country': 'Lorem ipsum dolor',
  		'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  		'title': 'Aenean commodo ligula eget dolor'
  	},

   	{
  		'project_no': '123456',
  		'country': 'Lorem ipsum dolor',
  		'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  		'title': 'Aenean commodo ligula eget dolor'
  	}
  ] //dummy values

  // check if undefined, return to home
  if(query){
  	res.render('search', { title: title, 
  						   query: query, 
  						   length: length,
  						   data: data
  						});
  }

  else{
  	res.render('index', { title: title});
  }
});

module.exports = router;