const { WebDriver, By } = require('selenium-webdriver');
const { Pool } = require('pg');
const {
  chrome,
  log,
  firefox,
  takeScreenshot,
  getConnection,
} = require('./src');

/**
 * Function to create the driver.
 * @callback creatorCallback
 * @param { string? } userAgent
 * @param { boolean? } devMode
 * @returns { Promise<WebDriver> }
 */

/**
 * The callback with the driver, the optional connection and
 * a callback to refresh the driver.
 * @callback wrapperCallback
 * @param { WebDriver } driver
 * @param { Pool? } connection
 * @param { creatorCallback } refresh
 * @returns { Promise<void> }
 */

/**
 * @param { ('firefox'| 'chrome') } browser
 * @param { wrapperCallback } callback
 * @param { { devMode: boolean?, userAgent: string?, user: string?, host: string?, database: string?, password: string?, port: number?} } options
 */
function selenium(
  browser,
  callback,
  { devMode, userAgent, user, host, database, password, port } = {
    devMode: null,
    userAgent: null,
    user: null,
    host: null,
    database: null,
    password: null,
    port: null,
  }
) {
  browser = browser.toLowerCase().trim();
  /**
   * @type { creatorCallback }
   */
  let creator = chrome;
  /**
   * @type { Pool? }
   */
  let connection = null;
  try {
    connection = getConnection({ host, user, database, password, port });
  } catch (error) {
    log.error(error);
  }
  if (browser === 'firefox') {
    creator = firefox;
  }
  const internalWrapper = async () => {
    const driver = await creator(userAgent, devMode);
    try {
      await callback(driver, connection, creator);
    } catch (err) {
      log.error(err);
    } finally {
      await driver.quit();
      if (connection) {
        try {
          await connection.end();
        } catch (error) {
          log.error(error);
        }
      }
    }
  };
  internalWrapper()
    .then(() => {
      log.debug('done');
    })
    .catch((err) => {
      log.error(err);
    });
}

exports.selenium = selenium;
exports.log = log;
exports.takeScreenshot = takeScreenshot;
