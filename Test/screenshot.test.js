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
      await page.screenshot({ path: "Test/Login.png" });
      await page.type("[name=UserName]", "executeautomation");
      await page.type("[name=Password]", "admin");
      await page.screenshot({ path: "Test/userLogin.png" });
    });

    afterAll(async () => {
      browser.close();
    });
  });
};

testFunction("example pdf");
