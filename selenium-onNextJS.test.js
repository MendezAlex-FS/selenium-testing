const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config();

describe('', () => {
  let driver;

  beforeAll(async () => {
    // Removing warnings. I like clean results
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();
    options.addArguments('--log-level=3');
    options.excludeSwitches('enable-logging');

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(1000);
  };

  it('Should open home page - and check the title is "Home"', async () => {
    await driver.get(process.env.URL);
    await driver.getTitle().then(title => {
      expect(title).toEqual('Home');
    });
    await setDelay();
  });

  it('Should open contact page - and check the title is "Contact Us"', async () => {
    await driver.get(await driver.getCurrentUrl() + '/contact');
    await driver.getTitle().then(title => {
      expect(title).toEqual('Contact Us');
    });
    await setDelay();
  });


  it('Should sign up for more info via email - and check the message is "More info coming to amendez4@student.fullsail.edu"', async () => {
    await driver.get(await driver.getCurrentUrl());

    let element = await driver.findElement(By.id('formInput'));
    await element.sendKeys('amendez4@student.fullsail.edu', Key.TAB);
    await driver.findElement(By.id('formSubmit')).click();
    // Don't think this is needed but just in case.
    await setDelay();

    const message = await driver.findElement(By.id('formMessage')).getText();
    expect(message).toEqual('More info coming to amendez4@student.fullsail.edu');
    await setDelay();
  });
});