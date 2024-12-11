const puppeteer = require('puppeteer');

describe('Бронирование билетов', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto('https://qamid.tmweb.ru/client/index.php');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Happy Path 1: Успешное бронирование билета', async () => {
        
        await page.click('[data-time-stamp="1734210000"]'); 
        await page.click('[data-seance-id="217"]'); 
        await page.waitForSelector('.buying-scheme__wrapper'); 

        
        const availableSeatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_selected):not(.buying-scheme__chair_taken)';
        
        
        await page.waitForSelector(availableSeatSelector);
        
        
        const availableSeat = await page.$(availableSeatSelector);
        if (availableSeat) {
            await availableSeat.click();
            await page.click('.acceptin-button'); 
            
            const ticketInfoWrapperSelector = '.ticket__info-wrapper';
            await page.waitForSelector(ticketInfoWrapperSelector);

            
            const buttonText = await page.$eval('.acceptin-button', el => el.textContent);
            expect(buttonText).toContain('Получить код бронирования');
        } else {
            throw new Error('Нет доступных мест для бронирования');
        }
    });

    test('Happy Path 2: Успешное бронирование другого сеанса', async () => {
        // Перезагрузка страницы для изоляции теста
        await page.goto('https://qamid.tmweb.ru/client/index.php');

        await page.click('[data-time-stamp="1734037200"]'); 
        await page.click('[data-seance-id="225"]'); // Выбор другого сеанса и даты

        await page.waitForSelector('.buying-scheme__wrapper'); 

        const availableSeatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_selected):not(.buying-scheme__chair_taken)';
        
        
        await page.waitForSelector(availableSeatSelector);
        
        
        const availableSeat = await page.$(availableSeatSelector);
        if (availableSeat) {
            await availableSeat.click();
            await page.click('.acceptin-button'); 
            
            const ticketInfoWrapperSelector = '.ticket__info-wrapper';
            await page.waitForSelector(ticketInfoWrapperSelector);

            const buttonText = await page.$eval('.acceptin-button', el => el.textContent);
            expect(buttonText).toContain('Получить код бронирования');
        } else {
            throw new Error('Нет доступных мест для бронирования');
        }
    });

    test('Sad Path: Попытка забронировать уже занятое место', async () => {
        
        await page.goto('https://qamid.tmweb.ru/client/index.php');
    
        await page.click('[data-time-stamp="1734382800"]'); 
    
        await page.click('[data-seance-id="198"]'); 
    
        await page.waitForSelector('.buying-scheme__wrapper'); 
    
        
        const takenSeatSelector = '.buying-scheme__chair.buying-scheme__chair_taken'; 
        await page.waitForSelector(takenSeatSelector); 
    
        const takenSeat = await page.$(takenSeatSelector); 
          
        if (takenSeat) {
           
            const isTaken = await takenSeat.evaluate(el => el.classList.contains('buying-scheme__chair_taken'));
            expect(isTaken).toBe(true); // Проверяем, что место занято
    
            
            const bookButtonDisabled = await page.$eval('.acceptin-button', el => el.hasAttribute('disabled'));
            
            if (bookButtonDisabled) {
                throw new Error('Тест не прошел: Место занято и кнопка "Забронировать" отключена.');
            } else {
                throw new Error('Тест не прошел: Кнопка "Забронировать" должна быть отключена для занятого места.');
            }
        } else {
            throw new Error('Нет занятых мест для проверки');
        }
    });   
    
    
    
});
