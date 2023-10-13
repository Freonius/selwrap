const { WebDriver, By, Key } = require('selenium-webdriver');
const { chrome, log } = require('./src');
// require('selenium-webdriver/firefox');

/**
 * This callback is displayed as a global member.
 * @callback wrapperCallback
 * @param { WebDriver } driver
 * @returns { Promise<void> }
 */

/**
 * @param { string } browser
 * @param { wrapperCallback } callback
 * @param { { devMode: boolean?, userAgent: string?} } options
 */
function seleniumWrapper(
  browser,
  callback,
  { devMode, userAgent } = { devMode: null, userAgent: null }
) {
  const internalWrapper = async () => {
    const driver = await chrome(userAgent);
    try {
      await callback(driver);
    } catch (err) {
      log.error(err);
    } finally {
      await driver.quit();
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

function main() {
  seleniumWrapper(
    'chrome',
    async (driver) => {
      await driver.get('https://google.com');
      await driver.findElement(By.name('q')).sendKeys('selenium', Key.ENTER);
      await driver.wait(async () => {
        const title = await driver.getTitle();
        return title === 'Google';
      });
    },
    { devMode: true }
  );
}

main();
