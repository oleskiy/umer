var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("ggggggg");
  res.send('respond with a AAA');
});

module.exports = router;
