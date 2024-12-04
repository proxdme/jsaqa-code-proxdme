const { test, expect } = require('@playwright/test');
const { email, password } = require('../user.js');  // Импортируем данные из user.js

// Тест 1: Успешная авторизация
test('Успешная авторизация', async ({ page }) => {
  // Открываем страницу авторизации
  await page.goto('https://netology.ru/?modal=sign_in');
  
    // Вводим email и пароль
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  // Нажимаем на кнопку "Войти"
  await page.click('[data-testid="login-submit-btn"]');

  // Проверяем, что открылась страница профиля
  const profileHeader = await page.locator('//h2[@class="src-components-pages-Profile-Programs--title--Kw5NH" and contains(text(), "Моё обучение")]'
);
  
});

// Тест 2: Неуспешная авторизация
test('Неуспешная авторизация', async ({ page }) => {
  // Открываем страницу авторизации
  await page.goto('https://netology.ru/?modal=sign_in');

  
  // Вводим невалидные данные
  await page.fill('input[name="email"]', 'invalid-email@example.com');
  await page.fill('input[name="password"]', 'invalid-password');

  // Нажимаем на кнопку "Войти"
  await page.click('[data-testid="login-submit-btn"]');

  // Проверяем наличие сообщения об ошибке
  const errorMessage = await page.locator('[data-testid="login-error-hint"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Вы ввели неправильно логин или пароль.');
});
