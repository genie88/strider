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
  test_id: { type: Schema.ObjectId, ref: 'test' }, //测试任务ID
  baseline: {  //测试基线
    id: { type: Schema.ObjectId, ref: 'test_job'},
    timestamp: Date,
  },
  trigger: TriggerNotSchema,   // 触发条件
  pagediff: [{                 // pagediff需要用到的vdom数组
    vdom: String,
    step: Number                // 第几步产生的
  }],
  screenshots: [{              // 用于屏幕截图比对
    path: String,
    step: Number                // 第几步产生的
  }],
  logs: [{                      // 用于日志比对
    content: String,
  }],
  std: {                        // 用于标准输入输出比对
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
    id: String,   // phantomJs/ CrasperJs / iOS Monitor / Anroid Monitor
    data: {}
  }
});


module.exports = mongoose.model('TestJob', TestJobSchema);
