export class LoginPage {
    typeEmail() {
        cy.get('#email')
            .type('yanatest@tt.tt')
    }

    typePassword() {
        cy.get('#password')
            .type('yanatest')
    }

    submitLogin() {
        cy.get('#submit')
            .should('be.enabled')
            .click()
    }

}

export const loginPage = new LoginPage();