var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config');
var parseString = require('xml2js').parseString;

var YAHOO_GEOCODER_API = 'http://geo.search.olp.yahooapis.jp/OpenLocalPlatform/V1/geoCoder?appid=' + config.get('yahoo-api-key');
var JALAN_AREA_SEARCH = 'http://jws.jalan.net/APICommon/AreaSearch/V1/?key=' + config.get('jalan-api-key');

// TODO: Refactoring
/* 温泉データ取得 */
router.get('/', function(req, res, next) {
  var jalanAreaHash = []; // jalanAreaHash['北海道'] = '010000';
  var targetPrefName = '東京都'; // initialize
  request.post({ url: JALAN_AREA_SEARCH }, function(err, api_res, xml_body) {
    parseString(xml_body, function(err, result) {
      var areaJson = result.Results.Area[0].Region;
      for (var i=0; i<areaJson.length; i++) {
        for (var j=0; j<areaJson[i].Prefecture.length; j++) {
          var pref = areaJson[i].Prefecture[j].$;
          jalanAreaHash[pref.name] = pref.cd;
        }
      }
      request.post(options2, callback2);
    });
  });

  var options2 = {
    url: YAHOO_GEOCODER_API + '&lat=36.578273&lon=136.647763' // 金沢駅
  };

  var callback2 = function(err, api_res, xml_body) {
    if (!err && api_res.statusCode === 200) {
      parseString(xml_body, function(err, result) {
        var prefName = result.YDF.Feature[0].Name[0].match(/.+都|.+道|.+府|.+県/)[0]; // 石川県
        if (prefName !== undefined) targetPrefName = prefName;
        console.log(targetPrefName);
        request.post(options, callback);
      });
    }
  };

  var options = {
    url: 'http://jws.jalan.net/APICommon/OnsenSearch/V1/?key=' + config.get('jalan-api-key') + '&pref=190000'
  };

  var callback = function(err, api_res, xml_body) {
    if (!err && api_res.statusCode === 200) {
      parseString(xml_body, function(err, result) {
        res.render('onsen_info', {onsen: result.Results.Onsen[0]});
      });
      return true;
    }
    console.log(api_res);
    res.send("error at じゃらんAPI");
  };

});

module.exports = router;
