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
  });
});
