'use strict';

var extend = require('extend');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TriggerNotSchema = {
  type: { type: String },
  author: {
    id: { type: Schema.ObjectId, ref: 'user' },
    url: String,
    name: String,
    email: String,
    image: String,
    username: String
  },
  message: String,
  timestamp: Date,
  url: String,
  source: {}
}

var TestJobSchema = new Schema({
  type: { type: String },
  user_id: { type: Schema.ObjectId, ref: 'user' }, //任务所有者
  baseline: //测试基线
  trigger: TriggerNotSchema,
  std: {
    out: String,
    err: String,
    merged: String
  },
  duration: Number,
  created: { type: Date, index: true },
  queued: Date,
  started: Date,
  finished: { type: Date, index: true },
  archived: { type: Date, index: true },
  test_exitcode: Number,
  errored: {type: Boolean, default: false},
  error: {
    message: String,
    stack: String
  },
  runner: {
    id: String,
    data: {}
  }
});


module.exports = mongoose.model('TestJob', TestJobSchema);
