'use strict';

var $ = require('jquery');

module.exports = function ($scope, $attrs) {
  $scope.test = {};
  $scope.tests = [];
  $scope.remove = function (test) {
    test.really_remove = 'removing';
    $.ajax('/' + test.id + '/', {
      type: 'DELETE',
      success: function () {
        $scope.tests.splice($scope.tests.indexOf(test), 1);
        $scope.success('test task removed', true);
      },
      error: function () {
        $scope.error('Failed to remove test task', true);
      }
    })
  };
  $scope.create = function () {
    console.log($scope.test)
    $.ajax('/tests/', {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        title: $scope.test.title,
        url: $scope.test.url,
        public: false,
        code: $scope.test.code,
        config: {
          header: $scope.test.config.header,
          useragent: $scope.test.config.useragent,
          screen: {
            width: $scope.test.config.screen.split('*')[0],
            height: $scope.test.config.screen.split('*')[1]
          }
        }
      }),
      success: function () {
        $scope.tests.push({
          title: $scope.test.title,
          url: $scope.test.url,
          public: false,
          code: $scope.test.code,
          config: {
            header: $scope.test.config.header,
            useragent: $scope.test.config.useragent,
            screen: {
              width: $scope.test.config.screen.split('*')[0],
              height: $scope.test.config.screen.split('*')[1]
            }
          }
        });
        $scope.test = {};
        $scope.success('添加测试任务成功', true);
        $('#createTestCase').modal('hide')
      },
      error: function () {
        $scope.error('添加测试任务失败', true);
        $('#createTestCase').modal('hide')
      }
    });
  }
};
