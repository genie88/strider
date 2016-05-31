var schedule = require('node-schedule');
var utils = require('./utils');
var models = require('./models');
var Project = models.Project;

exports.run = function(emitter){
  console.log('robot is running ...');

  var rule = new schedule.RecurrenceRule();
  //rule.second = 42;
  rule.minute = 1;

  var j = schedule.scheduleJob(rule, function(){
    console.log('daily build robot scanning ...');
    Project.find({}, function(err, projects) {
      if(err && !projects) return;

      projects.forEach(function(project) {
        if (project.branches && project.branches.length > 0) {
          project.branches.forEach(function(branch){
            if (branch.name == '*' || !branch.daily_build) return;
            var trigger, job, now = new Date()
            trigger = {
                type: 'manual',
                message: 'daily_build',
                author: {
                    id: '574b967f59b4a4d10509fe82',
                    email: 'genie88@163.com',
                    image: utils.gravatar('genie88@163.com')
                },
                timestamp: now,
                source: {type: 'UI', page: 'unknown'}
            }

            job = {
                type: 'TEST_ONLY',
                user_id: '574b967f59b4a4d10509fe82',
                project: project.name,
                ref: {branch: branch.name},
                trigger: trigger,
                created: now
            }

            //add to job queue
            console.log('add daily build task: %s - %s', project.name, branch.name)
            emitter.emit('job.prepare', job)
          })
        }
      });

    });
  });
}
