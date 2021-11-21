const puppeteer = require("puppeteer");

testFunction = (name) => {
  describe(`Sample e2e test ${name}: `, () => {
    let browser;
    let page;

    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox", "--start-maximized"],
        defaultViewport: null,
        slowMo: 50,
      });
      const pages = await browser.pages();
      page = pages[0];
    });

    it("go to amazon", async () => {
      await page.setRequestInterception(true); // by using this i am abort those kind of image to load
      page.on("request", (interceptRequest) => {
        if (
          interceptRequest.url().endsWith(".jpg") ||
          interceptRequest.url().endsWith(".png")
        ) {
          interceptRequest.abort();
        } else {
          interceptRequest.continue();
        }
      });
      await page.goto("https://www.amazon.com");
    });

    afterAll(async () => {
      browser.close();
    });
  });
};

testFunction("example network request interception");
