import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number("591######"),
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");
    cy.findByRole("link", { name: /join/i }).click();

    cy.get("input[name=name]").type(loginForm.name);
    cy.get("input[name=lastName]").type(loginForm.lastName);
    cy.get("input[name=phone]").type(loginForm.phone);
    cy.get("input[name=email]").type(loginForm.email);
    cy.get("input[name=password]").type(loginForm.password);
    cy.get("input[name=confirmPassword]").type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("link", { name: /log in/i });
  });
});
