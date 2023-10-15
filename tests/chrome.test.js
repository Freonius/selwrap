const { WebDriver, Builder, Options } = require('selenium-webdriver');
const { it, expect, describe } = require('@jest/globals');
const getDriver = require('../src/chrome');

describe('Chrome driver', () => {
  it('should create a Chrome driver in dev mode when devMode is true', async () => {
    const driver = await getDriver(undefined, true);
    expect(driver).toBeInstanceOf(WebDriver);
    await driver.quit();
    // Additional assertions for dev mode
  });

  it('should create a Chrome driver in prod mode when devMode is false or not provided', async () => {
    const driver = await getDriver();
    expect(driver).toBeInstanceOf(WebDriver);
    await driver.quit();
    // Additional assertions for prod mode
  });

  it('should create a Chrome driver with the specified user agent', async () => {
    const userAgent = 'Custom User Agent';
    const driver = await getDriver(userAgent);
    expect(driver).toBeInstanceOf(WebDriver);
    const userAgentValue = await driver.executeScript(
      'return window.navigator.userAgent;',
    );
    expect(userAgentValue).toBe(userAgent);
    await driver.quit();
    // Additional assertions for custom user agent
  });
});
