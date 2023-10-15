const process = require('process');
/**
 * @typedef {import('selenium-webdriver').WebDriver} WebDriver
 */
const { Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/firefox');
const { isDev } = require('./constants');
const log = require('./log');
const { randomInteger } = require('./utils');

/**
 * Get the WebDriver for Chrome
 * @param { string? } userAgent
 * @param { boolean? } devMode
 * @returns { Promise<WebDriver> }
 */
const getDriver = async (userAgent, devMode = null) => {
  let isDevLocal = isDev;
  if (devMode === true) {
    isDevLocal = true;
  }
  log.info('Creating Firefox driver');
  if (isDevLocal) {
    log.info('Running in dev mode');
  } else {
    log.info('Running in prod mode');
  }
  const opt = new Options();
  if (!isDevLocal) {
    opt.addArguments('--headless');
    opt.addArguments('--disable-dev-shm-usage');
    opt.addArguments('--window-size=1920,1080');
    opt.addArguments('--disable-extensions');
    opt.addArguments('--start-maximized');
    opt.addArguments('--disable-gpu');
    opt.addArguments('--disable-dev-shm-usage');
    opt.addArguments('--no-sandbox');
    opt.addArguments('--ignore-certificate-errors');
    opt.addArguments('--single-process');
    opt.addArguments('--disable-dev-tools');
    opt.addArguments('--disable-popup-blocking');
    opt.addArguments('--no-zygote');
    if (Object.prototype.hasOwnProperty.call(process.env, 'PROXY_SERVER')) {
      const proxyServers = process.env.PROXY_SERVER.trim().split(',');
      /* eslint-disable operator-linebreak */
      const proxyServer =
        proxyServers[randomInteger(0, proxyServers.length - 1)];
      /* eslint-enable operator-linebreak */
      opt.addArguments(`--proxy-server=${proxyServer}`);
    } else {
      opt.addArguments("--proxy-server='direct://'");
      opt.addArguments('--proxy-bypass-list=*');
    }
  }
  if (Object.prototype.hasOwnProperty.call(process.env, 'FIREFOX_PATH')) {
    opt.setBinary(process.env.FIREFOX_PATH);
  }
  if (userAgent) {
    opt.addArguments(`--user-agent=${userAgent}`);
  } else {
    opt.addArguments(
      '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    );
  }
  const driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(opt)
    .build();
  log.info('Firefox driver created');
  return driver;
};

module.exports = getDriver;
