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
    cy.get("#gluten").click();
    cy.contains("Submit").click();
    cy.visit("/table");
    cy.contains("Add Food Item").click();
    cy.get("#food_item").type("Candy");
    cy.contains("Submit").click();
    cy.contains("td", "1").click();
    cy.get("#food_item").clear();
    cy.get("#food_item").type("pickles");
    cy.contains("Submit").click();
  });
  it('clicks the link "Test2"', () => {
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
    cy.get("#gluten").click();
    cy.contains("Submit").click();
    cy.visit("/table");
    cy.contains("Add Food Item").click();
    cy.get("#food_item").type("Candy");
    cy.contains("Submit").click();
    cy.contains("td", "1").click();
    cy.get("#food_item").clear();
    cy.get("#food_item").type("pickles");
    cy.contains("Submit").click();
  });
});
