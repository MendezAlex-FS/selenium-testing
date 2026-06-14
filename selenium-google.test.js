const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config();

describe('', () => {
  let driver;

  beforeAll(async () => {
    // Added to bypass google chrome reCAPTCHA.
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--disable-blink-features=AutomationControlled');

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(1000);
  };

  it('As a user I want to open google.com', async () => {
    await driver.get(process.env.GOOGLE_URL);
    await driver.getTitle().then(title => {
      expect(title).toEqual('Google');
    });
    await setDelay();
  });

  it('As a user I want to search selenium in Google', async () => {
    await driver.get(await driver.getCurrentUrl());
    let element = await driver.findElement(By.name('q'));
    await element.sendKeys('Selenium', Key.TAB);
    await setDelay();
    await element.submit();
    // await driver.findElement(By.name('btnK')).click();
    // const isDisplayed = await driver.findElement(By.css('h3')).Displayed;
    // if (isDisplayed) {
    //   expect(driver.getPageSource()).contains('Selenium');
    // }
    // const error = await driver.findElement(By.id('error')).getText();
    // expect(error).toEqual('Error');

    await driver.wait(until.titleContains('Selenium - Google Search'), 4000);
    await driver.getTitle().then(title => {
      expect(title).toEqual('Selenium - Google Search');
    });
    await setDelay();
  });

  it('Current page content should have selenium contained on the page', async () => {
    await driver.get(await driver.getCurrentUrl());
    const isDisplayed = await driver.findElement(By.css('h3')).Displayed;
    if (isDisplayed) {
      expect(driver.getPageSource()).contains('Selenium');
    }
    await setDelay();
  });
});