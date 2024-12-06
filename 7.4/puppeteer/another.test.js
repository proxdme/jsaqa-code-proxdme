let page;

const setupPage = async (url) => {
  page = await browser.newPage();
  await page.goto(url);
};

const teardownPage = async () => {
  await page.close();
};

describe("Github page tests", () => {
  beforeEach(async () => {
    await setupPage("https://github.com/team"); // Стартовая страница для первых тестов
  });

  afterEach(teardownPage);

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    //await firstLink.click();
    await page.waitForSelector('h1', { timeout: 50000});
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 50000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, link => link.textContent.trim());
    expect(actual).toContain("Get started with Team");
  });
});

// Новый блок describe для других страниц
//describe("Other pages tests", () => {
  //beforeEach(async () => {
  //  await setupPage("https://github.com/features"); // Стартовая страница для новых тестов
 // });

  //afterEach(teardownPage);

  test("Check the header on another page1", async () => {
    await setupPage("https://github.com/features/copilot");
    //await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('GitHub Copilot · Your AI pair programmer · GitHub'); // Проверьте заголовок на странице example.com
  });

  test("Check the header on another page2", async () => {
    await setupPage("https://github.com/sponsors");
    //await page.goto("https://github.com/sponsors"); // Замените на нужный URL
    //await page.waitForSelector('hero-section-brand-heading');
    const title = await page.title();
    expect(title).toEqual('GitHub Sponsors · GitHub'); // Проверьте заголовок на странице another-example.com
  });

 test("Check the header on another page3", async () => {
    await setupPage("https://github.com/pricing");
    //await page.goto("https://github.com/pricing"); // Замените на нужный URL
    //await page.waitForSelector('h2-mktg');
    const title = await page.title();
    expect(title).toEqual('Pricing · Plans for every developer · GitHub'); // Проверьте заголовок на странице yet-another-example.com
  });
//});