'use strict';

var extend = require('extend');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Schema({
  title: { type: String }, // 测试任务标题
  desc: { type: String },  // 测试任务描述
  public: {                // 是否公开
    type: Boolean,
    default: false,
    index: true
  },
  config: {
    header: String,    // 自定义请求头
    useragent: String, // 浏览器标识
    proxy: String,     // 网络代理
    screen: {          // 屏幕尺寸
      hight: Number,
      witdh: Number
    }
  },
  url: String,  // 测死页面地址: http://m.mgtv.com
  type: String, // 测试任务类型 single/multiple
  creator: {
    type: Schema.ObjectId,
    ref: 'user',
    index: true
  },
  code: String,   // 测试用例
  status: String,  // 测试状态：active/inactive 启用/未启用
  trigger: String // 触发条件 crontab 类似的触发条件
});


module.exports = mongoose.model('Test', TestSchema);
