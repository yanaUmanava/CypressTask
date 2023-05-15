export class ContactPage {
    triggerContactDeletion() {
        cy.get('#delete')
            .should('be.enabled')
            .click();
    }

    confirmContactDeletion() {
        cy.on('window:confirm', () => true);
    }
}

export const contactPage = new ContactPage();