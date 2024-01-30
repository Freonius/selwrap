const { it, expect, describe } = require('@jest/globals');

const { WebDriver, Builder, Options } = require('selenium-webdriver');
const sinon = require('sinon');
const { selenium } = require('..');

// Import the function to be tested
jest.setTimeout(5000);
jest.retryTimes(3);
describe('selenium', () => {
  // Test case 1: Test with 'firefox' browser and valid callback
  it('should create a firefox driver and call the callback function', async () => {
    // Arrange
    const browser = 'firefox';
    const callback = sinon.spy();
    const options = {
      devMode: false,
      userAgent: 'Mozilla/5.0',
    };

    // Act
    selenium(browser, callback, options);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(callback.calledOnce).toBe(true);
    expect(callback.firstCall.args[0]).toBeInstanceOf(WebDriver);
  });

  // Test case 3: Test with invalid browser
  it('should throw an error if an invalid browser is provided', async () => {
    // Arrange
    const browser = 'invalid';
    const callback = sinon.stub();
    const options = {
      devMode: false,
      userAgent: 'Mozilla/5.0',
    };

    // Act and Assert
    let thrown = false;
    try {
      selenium(browser, callback, options);
    } catch (err) {
      thrown = true;
      expect(err.message).toBe('Invalid browser');
    } finally {
      expect(thrown).toBe(true);
    }
  });
});
