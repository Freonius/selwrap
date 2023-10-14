const process = require('process');
const { WebDriver, Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const { isDev } = require('./constants');
const log = require('./log');
const { randomInteger } = require('./utils');

const waitUntilChromeIsReady = async (i = 0) => {
  if (i > 10) {
    return;
  }
  i++;
  try {
    await fetch('http://localhost:9222/json');
    log.debug('Chrome is ready');
  } catch (e) {
    log.error(e);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await waitUntilChromeIsReady(i);
  }
};

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
  log.info('Creating Chrome driver');
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
    if (process.env.hasOwnProperty('PROXY_SERVER')) {
      const proxyServers = process.env.PROXY_SERVER.trim().split(',');
      const proxyServer =
        proxyServers[randomInteger(0, proxyServers.length - 1)];
      opt.addArguments(`--proxy-server=${proxyServer}`);
    } else {
      opt.addArguments("--proxy-server='direct://'");
      opt.addArguments('--proxy-bypass-list=*');
    }

    opt.addArguments('--remote-debugging-port=9222');
  }
  if (process.env.hasOwnProperty('CHROME_PATH')) {
    opt.setChromeBinaryPath(process.env.CHROME_PATH);
  }
  if (userAgent) {
    opt.addArguments(`--user-agent=${userAgent}`);
  } else {
    opt.addArguments(
      '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    );
  }
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(opt)
    .build();
  if (!isDevLocal) {
    // await waitUntilChromeIsReady();
  }
  log.info('Chrome driver created');
  return driver;
};

module.exports = getDriver;
