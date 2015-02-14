var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config');

/* 温泉データ取得 from じゃらん */
router.get('/', function(req, res, next) {

  var options = {
    url: 'http://jws.jalan.net/APICommon/OnsenSearch/V1/?key=' + config.get('jalan-api-key') + '&l_area=010300&count=1&xml_ptn=1'
  };

  var callback = function(err, api_res, body) {
    if (!err && api_res.statusCode === 200) {
      console.log(body);
      res.send('respond with a resource');
    }
  };
  request.post(options, callback);
});

module.exports = router;
