let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {

    const firstLink = await page.$("header div div a");
    if (!firstLink) {
      console.log("Element not found with selector: header div div a");
      return;
    }
    // await firstLink.click();
    await page.waitForSelector("h1", { timeout: 50000 });
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 50000);

  test("The first link attribute", async () => {

    jest.setTimeout(30000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {

    jest.setTimeout(30000);
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {visible: true});
    
    const actual = await page.$eval(btnSelector, link => link.textContent.trim());
    expect(actual).toContain("Sign up for free")
  });
});
