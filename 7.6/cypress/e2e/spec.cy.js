describe('template spec', () => {
	before(() => {
		// Авторизуемся перед выполнением тестов
		cy.visit(Cypress.config('baseUrl'));
		cy.login('test@test.com', 'test');

	});

	it('Представляемся в системе', () => {

		cy.contains('Log out').should('be.visible');
		cy.contains('Добро пожаловать test@test.com').should('be.visible');
	})

	it('Отсутствует email в форме представления в системе', () => {
		cy.visit('http://localhost:3000/');
		cy.login(' ', 'test');
		cy
			.get('#mail')
			.then(($el) => {
				return $el[0].checkValidity()
			})
			.should('be.false');

	})

	it('Добавляем новую книгу в избранное', () => {
        cy.visit(Cypress.config('baseUrl'));
        cy.login('test@test.com', 'test');

		cy.contains('Add new').click();
		cy.get('#title').type('fffff');
		cy.get('#description').type('ffffff');
		cy.get('#authors').type('fffffff');
		cy.get('#favorite').check();
		cy.get('.ml-2.btn.btn-success').click();

		cy.contains('fffff').should('be.visible');

	});

	it('Новая книга в списке избранного', () => {
        cy.visit(Cypress.config('baseUrl'));
        cy.login('test@test.com', 'test');
		cy.contains('fffff').should('be.visible');
	});

    it('Добавляем новую книгу в список', () => {
            cy.visit(Cypress.config('baseUrl'));
            cy.login('test@test.com', 'test');

    		cy.contains('Add new').click();
    		cy.get('#title').type('Новая книга в списке');
    		cy.get('#description').type('фффф');
    		cy.get('#authors').type('фффф');
       		cy.get('.ml-2.btn.btn-success').click();

    		cy.contains('Новая книга в списке').should('be.visible');

    	});

        it('Проверка отображения на мобильном устройстве', () => {
            cy.visit(Cypress.config('baseUrl'));
            cy.login('test@test.com', 'test');
            cy.viewport(375, 667); // Установка размера экрана для мобильного устройства
            cy.contains('Log out').should('be.visible');

        });


})