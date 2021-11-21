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

    it("daraz.com", async () => {
      await page.goto("https://www.daraz.com.bd/");
      await page.waitForResponse((response) => {
        return response.request().resourceType() === "image"; // wait until load all images
      });

      //----    auto scroll ----//
      const autoScroll = async (page) => {
        await page.evaluate(async () => {
          await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if (totalHeight >= scrollHeight) {
                clearInterval(timer);
                resolve();
              }
            }, 100);
          });
        });
      };

      //? auto scroll: https://github.com/chenxiaochun/blog/issues/38
      await autoScroll(page);
      //----    auto scroll ----//
    });

    afterAll(async () => {
      browser.close();
    });
  });
};

testFunction("example 1");
