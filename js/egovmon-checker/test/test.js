// Generated by CoffeeScript 1.3.3
(function() {
  var assert, egovmonChecker;

  egovmonChecker = require('../egovmon-checker');

  assert = require('assert');

  describe('checkWebPage', function() {
    return it('should return an object', function(done) {
      return egovmonChecker.checkWebPage('http://www.alexanderte.com/', function(error, result) {
        assert.ok(typeof result === 'object');
        return done();
      });
    });
  });

}).call(this);
