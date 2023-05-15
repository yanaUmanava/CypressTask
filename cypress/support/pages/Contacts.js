export class ContactsList {
    openContact(rowNumber) {
        cy.get('#myTable').find('tr').eq(rowNumber)
            .click();
    }
    
    deletedRowId = '';

    defineRowId(rowNumber) {
        cy.get('#myTable')
            .find('tr')
            .eq(rowNumber)
            .find('td[hidden="true"]')
            .invoke('text')
            .as('rowId')
            .then((rowId) => {
                this.deletedRowId = rowId;
                //cy.log(`Deleted Row ID: ${deletedRowId}`);
            });
    }

    checkIfRowDeleted() {
        cy.get('#myTable tr td[hidden="true"]').each((td) => {
            cy.wrap(td).invoke('text').then((rowId) => {
                expect(rowId).not.to.equal(this.deletedRowId);
            });
        });
    }
}

export const contactsList = new ContactsList();