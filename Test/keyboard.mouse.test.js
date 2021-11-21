const puppeteer = require("puppeteer");

testFunction = (name) => {
  describe(`Sample test ${name}`, () => {
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

    it("login", async () => {
      await page.goto(URL);
      await page.type("[name=UserName]", "executeautomation");
      // await (await page.$("[name=UserName]")).type('test name'); // 2nd way
      await page.type("[name=Password]", "admin");

      //Xpath 3rd way
      // await page.$x('//input[@name=Password]').then(ele => {
      //   ele[0].type('admin');
      // });

      await page.keyboard.press("Enter", { delay: 2000 });

      //menu
      const result = await page.evaluate(() => {
        [...element] = document.querySelectorAll("div[id=cssmenu] li");
        return [...element].map((x) => x.textContent);
      });

      //Using spred syntax i can get the text
      [...result].forEach((x) => {
        console.log(x);
      });
    });

    it("fillup form", async () => {
      const initialName = "[name=Initial]";
      const firstName = "[name=FirstName]";
      const middleName = "[name=MiddleName]";
      const checkbox = "[name=Hindi]";
      const button = "[name=Save]";

      await page.waitForSelector(initialName);
      await page.type(initialName, "sajal");

      await page.waitForSelector(firstName);
      await page.type(firstName, "sohrab");

      await page.waitForSelector(middleName);
      await page.type(middleName, "hossain");

      await page.waitForSelector(checkbox);
      await page.click(checkbox);

      await page.waitForSelector(button);
      await page.click(button);
    });

    it("hover all items", async () => {
      //hover
      await page.waitForSelector("[id='Automation Tools']");
      await page.hover("[id='Automation Tools']");

      const postSelector = "ul li a";
      const menuUrls = await page.$$eval(postSelector, (postLink) =>
        postLink.map((links) => links.href)
      );

      // iterate the menuUrls
      for (let menuUrl of menuUrls) {
        try {
          await page.goto(menuUrl);
          console.log("Navigated to the page: ", menuUrl);
        } catch (error) {
          console.log(error);
        }
      }
    });

    afterAll(async () => {
      browser.close();
    });
  });
};

testFunction("example 2");
