"use strict";

require('dotenv').config();

var Travis = require('travis-ci');
var travis = new Travis({
  version: '2.0.0',
  headers: {
    'user-agent': 'Travis CI - DNHCPP'
  }
});

// TODO: Promisify
module.exports.run = function (event, context, cb) {
  travis.authenticate({
    github_token: process.env.GITHUB_TOKEN
  }, function (err) {
    if (err) cb(err);
    travis.repos(process.env.REPO_OWNER, process.env.REPO_NAME).builds().get(function (err, res) {
      if (err) cb(err);
      var builds = res.builds;
      var commits = res.commits;


      var passedBuild = builds.map(function (build) {
        return Object.assign({}, build, {
          commit: commits.find(function (commit) {
            return commit.id === build.commit_id;
          })
        });
      }).find(function (build) {
        return build.state === "passed" && !build.pull_request && build.commit.branch === "master" && build.commit.author_name === "Khoa Nguyen";
      });

      travis.builds(passedBuild.id).restart.post(function (err, res) {
        if (err) cb(err);
        cb(null, res);
      });
    });
  });
};
