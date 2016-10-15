var urllib = require('url');

var express = require('express');
var slackin = require('slackin');

var pkgNameUpper = require('./package').name.toUpperCase();
var teams = require('./teams');

function getTeamEnvVarName (team) {
  var teamSanitised = (team || '')
    .trim()
    .replace(/\W+/g, '_')
    .toUpperCase();
  return pkgNameUpper + '_TOKEN_' + teamSanitised;
}

function forceTrailingSlashRedirectMiddleware (req, res, next) {
  var url = urllib.parse(req.url);

  var pathname = url.pathname;
  var qs = url.search || '';
  var hasSlash = pathname.substr(-1) === '/';

  if (pathname.substr(-1) === '/') {
    next();
  } else {
    res.redirect(302, pathname + '/');
  }
}

var app = express();

Object.keys(teams).forEach(function (teamName) {
  var team = teams[teamName];

  var teamOrg = 'org' in team ? team.org :
    ('name' in team ? team.name : teamName);
  var teamEnvVarName = 'env_var_name' in team ? team.env_var_name :
    getTeamEnvVarName(teamOrg);
  var teamToken = process.env[teamEnvVarName];
  var teamInterval = 'interval' in team ? team.interval : 1000;
  var teamPath = '/' + teamOrg + '/';
  var teamPathSlashless = '/' + teamOrg + '/';
  var teamChannels = '';
  if ('channels' in team) {
    if (Array.isArray(team.channels)) {
      teamChannels = team.channels.join(',');
    }
    if (typeof team.channels === 'string') {
      teamChannels = team.channels;
    }
  }
  var teamSilent = 'silent' in team ? team.silent : false;
  var teamCSS = 'css' in team ? team.css : '';

  var teamApp = slackin.default({
    token: teamToken,
    interval: teamInterval,
    org: teamOrg,
    path: teamPath,
    channels: teamChannels,
    silent: teamSilent,
    css: teamCSS
  });

  app.use(teamPath, teamApp.app);
});

app.listen(process.env.SLACKINVITER_PORT || process.env.PORT || 3000);
