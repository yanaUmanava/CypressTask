import { user, loginUrl, urlToAddContact, firstNames, lastNames, cities, countries, addContactUrl } from "../support/constants";

describe('Create User Contacts via API', () => {
  function getRandomFirstName() {
    const randomIndex = Math.floor(Math.random() * firstNames.length);
    return firstNames[randomIndex];
  }

  function getRandomLastName() {
    const randomIndex = Math.floor(Math.random() * lastNames.length);
    return lastNames[randomIndex];
  }

  function getRandomBirthdate() {
    const start = new Date(1970, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  }

  function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }

  function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }

  const userContactsToCreate = 10;

  for (let i = 1; i <= userContactsToCreate; i++) {
    const contactData = {
      firstName: getRandomFirstName(),
      lastName: getRandomLastName(),
      birthdate: getRandomBirthdate(),
      email: `usercontact${i}@test.tt`,
      phone: `123456789${i}`,
      street1: `St. ${i}`,
      street2: `Apartment ${i}`,
      city: getRandomCity(),
      stateProvince: `KS ${i}`,
      postalCode: `1234${i}`,
      country: getRandomCountry()
    };

    it(`Login & add user contact ${i}`, () => {
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: user,
      }).then((response) => {
        expect(response.status).to.eq(200);

        const tokenRegex = /token=([^;]*)/;
        const setCookieHeader = response.headers['set-cookie'];
        const match = setCookieHeader && setCookieHeader[0].match(tokenRegex);
        const authToken = match && match[1];

        cy.request({
          method: 'POST',
          url: addContactUrl,
          headers: {
            Authorization: authToken,
            DummyHeader: "dummyValue"
          },
          body: contactData,
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.firstName).to.eq(contactData.firstName);
          expect(response.body.lastName).to.eq(contactData.lastName);
          expect(response.body.birthdate).to.eq(contactData.birthdate);
          expect(response.body.email).to.eq(contactData.email);
          expect(response.body.phone).to.eq(contactData.phone);
          expect(response.body.street1).to.eq(contactData.street1);
          expect(response.body.street2).to.eq(contactData.street2);
          expect(response.body.city).to.eq(contactData.city);
          expect(response.body.stateProvince).to.eq(contactData.stateProvince);
          expect(response.body.postalCode).to.eq(contactData.postalCode);
          expect(response.body.country).to.eq(contactData.country);
        });
      });
    });
  }
});