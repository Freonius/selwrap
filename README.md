# selwrap

A wrapper for selenium to ease the creation of a webdriver for
firefox or chrome.

Probably I will be the only one using this, but if you do use it,
feel free to drop me a note at freonius@gmail.com

## Example

```javascript
const { selenium, takeScreenshot, log } = require('selwrap');

selenium('firefox', async (driver, connection, creator) => {
  await driver.get('https://www.google.com');
  log.info('Visited google.com');
  await takeScreenshot(driver);
});
```
