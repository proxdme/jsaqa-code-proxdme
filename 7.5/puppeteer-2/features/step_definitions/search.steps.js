import { Given, When, Then } from '@cucumber/cucumber';
import puppeteer from 'puppeteer';
import { expect } from 'chai';

let browser;
let page;

Given('я нахожусь на странице бронирования', async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('https://qamid.tmweb.ru/client/index.php');
});

When('я выбираю дату {string} и сеанс {string}', async (date, sessionId) => {
    await page.click(`[data-time-stamp="${date}"]`);
    await page.waitForSelector(`[data-seance-id="${sessionId}"]`, { timeout: 10000 });
    await Promise.all([
        page.click(`[data-seance-id="${sessionId}"]`),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);
    await page.waitForSelector('.buying-scheme__wrapper');
});

When('я выбираю первое доступное место', async () => {
    const availableSeatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_selected):not(.buying-scheme__chair_taken)';
    
    await page.waitForSelector(availableSeatSelector);
    
    const availableSeat = await page.$(availableSeatSelector);
    if (availableSeat) {
        await availableSeat.click();
        return;
    } else {
        throw new Error('Нет доступных мест для бронирования');
    }
});

When('я нажимаю на кнопку "Забронировать"', async () => {
    const buttonSelector = '.acceptin-button';
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);
});

Then('я должен увидеть кнопку "Получить код бронирования" активной', async () => {
    const button = await page.$('.acceptin-button');
    const isEnabled = !(await button.evaluate(el => el.hasAttribute('disabled')));
    expect(isEnabled).to.be.true;
});

When('я пытаюсь выбрать занятое место', async () => {
    const takenSeatSelector = '.buying-scheme__chair.buying-scheme__chair_taken';
    
    await page.waitForSelector(takenSeatSelector);
    
    const takenSeat = await page.$(takenSeatSelector);
    
    if (takenSeat) {
        const bookButtonDisabled = await page.$eval('.acceptin-button', el => el.hasAttribute('disabled'));
        expect(bookButtonDisabled).to.be.true;
        return;
    }
    
    throw new Error('Нет занятых мест для проверки');
});

Then('кнопка {string} должна быть отключена', async (buttonText) => {
    const bookButtonDisabled = await page.$eval('.acceptin-button', el => el.hasAttribute('disabled'));
    expect(bookButtonDisabled).to.be.true;
});




