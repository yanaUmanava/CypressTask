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
    contactsList.checkIfTableLoaded();
    contactsList.defineRowId(1);
    contactsList.openContact(1);
    contactPage.triggerContactDeletion();
    contactPage.confirmContactDeletion();
    contactsList.checkIfTableLoaded();
    contactsList.checkIfRowDeleted();
  });

  it('delete 6th contact', () => {
    contactsList.checkIfTableLoaded();
    contactsList.defineRowId(6);
    contactsList.openContact(6);
    contactPage.triggerContactDeletion();
    contactPage.confirmContactDeletion();
    contactsList.checkIfTableLoaded();
    contactsList.checkIfRowDeleted();
  });
});