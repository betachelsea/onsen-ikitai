var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config');
var parseString = require('xml2js').parseString;

/* 温泉データ取得 from じゃらん */
router.get('/', function(req, res, next) {

  var options = {
    url: 'http://jws.jalan.net/APICommon/OnsenSearch/V1/?key=' + config.get('jalan-api-key') + '&l_area=010300&count=1&xml_ptn=1'
  };

  var callback = function(err, api_res, xml_body) {
    if (!err && api_res.statusCode === 200) {
      parseString(xml_body, function(err, result) {
        res.render('onsen_info', {onsen: result.Results.Onsen[0]});
      });
    }
  };
  request.post(options, callback);
});

module.exports = router;
