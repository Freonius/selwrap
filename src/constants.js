const process = require('process');
const path = require('path');
const fs = require('fs');

/**
 * @type { boolean}
 */
const isDev = (() => {
  if (
    process.env.hasOwnProperty('NODE_ENV') &&
    ['development', 'dev', 'debug'].includes(
      process.env.NODE_ENV.trim().toLowerCase()
    )
  ) {
    return true;
  }
  return false;
})();

const logFolder = (() => {
  let fld = 'logs';
  if (
    process.env.hasOwnProperty('LOG_FOLDER') &&
    process.env.LOG_FOLDER.trim() != ''
  ) {
    fld = process.env.LOG_FOLDER.trim();
  }
  if (!path.isAbsolute(fld)) {
    fld = path.join(__dirname, fld);
  }
  if (!fs.existsSync(fld)) {
    fs.mkdirSync(fld);
  }
  if (!fld.endsWith(path.sep)) {
    fld += path.sep;
  }
  return fld;
})();

const screenshotFolder = (() => {
  let fld = 'screenshots';
  if (
    process.env.hasOwnProperty('SCREENSHOT_FOLDER') &&
    process.env.SCREENSHOT_FOLDER.trim() != ''
  ) {
    fld = process.env.SCREENSHOT_FOLDER.trim();
  }
  if (!path.isAbsolute(fld)) {
    fld = path.join(__dirname, fld);
  }
  if (!fs.existsSync(fld)) {
    fs.mkdirSync(fld);
  }
  if (!fld.endsWith(path.sep)) {
    fld += path.sep;
  }
  return fld;
})();

exports.isDev = isDev;
exports.logFolder = logFolder;
exports.screenshotFolder = screenshotFolder;
