'use strict';

var angular = require('angular');
var interpolate = require('../utils/interpolate');
var TestController = require('./controllers/test');
// var TestJobController = require('./controllers/test_job');

var app = angular.module('tests', ['alerts', 'moment', 'ui.bootstrap.buttons'])
  .config(['$interpolateProvider', interpolate])
  .controller('TestController', ['$scope', '$attrs', TestController])
  // .controller('TestJobController', ['$scope', '$attrs', TestJobController])

module.exports = app;
