const fs = require('fs');
const { screenshotFolder } = require('./constants');

/**
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param {WebDriver} driver
 * @param {string?} filename
 * @returns {Promise<void>}
 */
const takeScreenshot = async (driver, filename = null) => {
  if (!filename) {
    filename = new Date().toISOString().replace(/[^0-9]/g, '');
  }
  const binaryData = Buffer.from(await driver.takeScreenshot(), 'base64');
  const fullPath = `${screenshotFolder}${filename}.png`;
  fs.writeFileSync(fullPath, binaryData);
};

exports.randomInteger = randomInteger;
exports.takeScreenshot = takeScreenshot;
