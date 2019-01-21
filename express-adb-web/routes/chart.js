var express = require('express');
var router = express.Router();

/* GET home page - '/' */
router.get('/', function(req, res, next) {
  
  var title = 'Search | Asian Development Bank'
  res.render('chart', { title: title });
});

module.exports = router;