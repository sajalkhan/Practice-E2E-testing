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

    it("Fillup form and go to dashboard", async () => {
      await page.goto(URL);
      await page.type("[name=UserName]", "executeautomation");
      await page.type("[name=Password]", "admin");
      await page.keyboard.press("Enter", { delay: 2000 });
    });

    afterAll(async () => {
      browser.close();
    });
  });
};

testFunction("example 1");
