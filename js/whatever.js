// Generated by CoffeeScript 1.3.3
(function() {
  var egovmonChecker, util;

  egovmonChecker = require('./egovmon-checker/egovmon-checker');

  util = require('util');

  egovmonChecker.checkWebPage('http://www.alexanderte.com/', function(error, result) {
    return console.log(util.inspect(result, false, null));
  });

}).call(this);
