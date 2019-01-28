var express = require('express');
var router = express.Router();
var request = require('request'), username='nmdev', password='nmdev', auth= "Basic " + new Buffer(username + ":" + password).toString("base64");

var HTTP_TIMEOUT_MS = 3000  ;
var API_URL = 'http://neuralmechanics.ai/adb-api/'

var API_URL_PROBLEM = API_URL + 'get_problems'
var API_URL_CAUSE_EFFECT = API_URL + 'get_causes_effects'

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

  // check if undefined, return to home
  if(query){
      request({
          url: API_URL_PROBLEM,
          headers:{
            "Authorization" : auth
          },
          method: 'POST',
          json: {'data': {'text': query, 'type': 'problem'}}
        }, function(error, response, body){
              console.log(body);
              if(!body['data'])
                body['data'] = JSON.parse(JSON.parse(body)['data'])['data']

              res.render('search', { title: title, 
                 query: query, 
                 length: body['data']['data'].length,
                 data: body['data']
              });
        });
  }

  else{
  	res.render('index', { title: title});
  }
});

module.exports = router;
