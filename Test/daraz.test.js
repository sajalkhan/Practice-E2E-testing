const playwright = require("playwright");
const { getEdgePath } = require("edge-paths");
const EDGE_PATH = getEdgePath();

testFunction = (name) => {
  describe(`Sample e2e test ${name}: `, () => {
    let browser;
    let page;

    beforeAll(async () => {
      browser = await playwright.chromium.launch({
        headless: false,
        slowMo: 50,
        executablePath: EDGE_PATH,
      });
      const context = await browser.newContext();
      page = await context.newPage();
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
  });
};

testFunction("daraz.com");
