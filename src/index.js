const chrome = require('./chrome');
const firefox = require('./firefox');
const { isDev, screenshotFolder, logFolder } = require('./constants');
const log = require('./log');
const { takeScreenshot } = require('./utils');
const { getConnection } = require('./db');

exports.isDev = isDev;
exports.screenshotFolder = screenshotFolder;
exports.chrome = chrome;
exports.firefox = firefox;
exports.logFolder = logFolder;
exports.log = log;
exports.takeScreenshot = takeScreenshot;
exports.getConnection = getConnection;
