describe("template spec", () => {
  it('clicks the link "Add and Table"', () => {
    cy.visit("/");
    cy.contains("View Table").click();
    cy.contains("Add Food Item").click();
    cy.get("#food_item").type("Cookies");
    cy.contains("Submit").click();
    cy.contains("Cookies").then(() => {
      cy.get("Button").contains("Delete").click();
    });
    cy.visit("/table");
    cy.contains("Add Food Item").click();
    cy.get("#food_item").type("Pizza");
    cy.get("#maybe-radio").click();
    cy.get("#notsure-check").click();
    cy.contains("Submit").click();
    cy.visit("/table");
    cy.contains("Add Food Item").click();
    cy.get("#food_item").type("Candy");
    cy.contains("Submit").click();
  });
});
