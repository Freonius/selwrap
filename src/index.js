const chrome = require('./chrome');
const { isDev, screenshotFolder, logFolder } = require('./constants');
const log = require('./log');

exports.isDev = isDev;
exports.screenshotFolder = screenshotFolder;
exports.chrome = chrome;
exports.logFolder = logFolder;
exports.log = log;
