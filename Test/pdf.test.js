const puppeteer = require("puppeteer");

testFunction = (name) => {
  describe(`Sample e2e test ${name}: `, () => {
    let browser;
    let page;

    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--start-maximized"],
        defaultViewport: null,
        slowMo: 50,
      });
      const pages = await browser.pages();
      page = pages[0];
    });

    it("Fillup form and go to dashboard", async () => {
      await page.goto(URL);
      await page.type("[name=UserName]", "executeautomation");
      await page.type("[name=Password]", "admin");
      await page.pdf({ path: "Test/e2eTest.pdf", format: "A4" });
    });

    afterAll(async () => {
      browser.close();
    });
  });
};

testFunction("example pdf");
