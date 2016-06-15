'use strict';

var express = require('express');
var async = require('async');
var common = require('../common');
var models = require('../models');
var pjson = require('../../package.json');
var router = express.Router();
var Project = models.Project;
var Test = models.Test;
var User = models.User;
var debug = require('debug')('strider:routes');

router.route('/')
  .get(function (req, res) {
    Test.find({creator: req.user._id}).lean().exec(function (err, cases) {
      if (err) return res.send(500, 'Failed to get test cases from the database')
      return res.format({
        html: function() {
          res.render('tests.html', {
            tests: cases,
            flash: req.flash(),
            version: pjson.version
          });
        },
        json: function() {
          res.send({
            tests: cases,
          });
        }
      });
    });
  })
  .post(function (req, res) {
    // 创建测试任务
    var test = new Test();
    test.url= req.body.url;
    test.title = req.body.title;
    test.type = "single";
    test.code = req.body.code || '';
    test.config = req.body.config || {};
    test.creator = req.user._id;

    test.save(function (error, test) {
      if (error || !test) {
        console.log('Error Creating test:' + error);
        res.json({code: '500'});
      } else {
        res.json({code: '200', id: test.id});
      }
    });

  });

module.exports = router;
