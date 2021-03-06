var express = require('express');
var router = express.Router();

/* GET home page - '/' */
router.get('/', function(req, res, next) {
  
  var data = 
  	[{'text': 'Lack of safe  and efficient road accesibility', 'type':'problem'},
  	{'text': 'High level of dust in dry season', 'type':'effect'},
  	{'text': 'Rural areas inacessible in rainy season', 'type':'effect'},
  	{'text': 'Transport is costly and time consuming', 'type':'effect'},
  	{'text': 'Ordinary and rural road investments below demand', 'type':'cause'},
  	{'text': 'Rapidly growing traffic', 'type':'cause'},
  	{'text': 'Unsafe road conditions', 'type':'cause'}]
  
  console.log(data)
  
  var title = 'Problem Tree | Asian Development Bank'
  res.render('chart', { 'title': title, 'data': data} );
});

/* GET home page - '/' */
router.get('/create', function(req, res, next) {
  
  var data = JSON.parse('[' + req.query.data + ']')
  console.log(data)
  
  var title = 'Problem Tree | Asian Development Bank'
  res.render('chart', { 'title': title, 'data': data} );
});

module.exports = router;