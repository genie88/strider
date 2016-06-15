require('mongoose').models = {};
module.exports = {
  InviteCode: require('./invite'),
  Test: require('./test'),
  TestJob: require('./test_job'),
  Job: require('./job'),
  User: require('./user'),
  Project: require('./project'),
  Config: require('./config')
}
