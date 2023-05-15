/// <reference types="Cypress" />

import { loginPage } from "../support/pages/Login";
import { contactsList } from "../support/pages/Contacts";
import { contactPage } from "../support/pages/ContactPage";
import { baseUrl } from "../support/constants";

describe('Delete contact', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.submitLogin();
  })

  it('delete 1th contact', () => {
    cy.get('#myTable').should('be.visible');
    contactsList.defineRowId(1);
    contactsList.openContact(1);
    contactPage.triggerContactDeletion();
    contactPage.confirmContactDeletion();
    cy.get('#myTable').should('be.visible');
    contactsList.checkIfRowDeleted();
  });

  it('delete 6th contact', () => {
    cy.get('#myTable').should('be.visible');
    contactsList.defineRowId(6);
    contactsList.openContact(6);
    contactPage.triggerContactDeletion();
    contactPage.confirmContactDeletion();
    cy.get('#myTable').should('be.visible');
    contactsList.checkIfRowDeleted();
  });
});