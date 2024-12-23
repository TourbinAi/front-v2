/// <reference types="cypress" />

describe("PathFinderForm Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fa")
  })

  it("should render the form correctly", () => {
    cy.contains("label", "مبدأ").should("be.visible")
    cy.get('input[placeholder="مبدأ را وارد کنید"]').should("exist")
    cy.contains("label", "مقصد").should("be.visible")
    cy.get('input[placeholder="مقصد را وارد کنید"]').should("exist")
    cy.contains("button", "ارسال").should("be.visible")
  })

  it("should allow user to enter origin and destination", () => {
    cy.get('[placeholder="مبدأ را وارد کنید"]').type("تهران")
    cy.get('[role="option"]').should("be.visible").first().click()

    cy.get('[placeholder="مقصد را وارد کنید"]').type("مشهد")
    cy.get('[role="option"]').should("be.visible").first().click()

    cy.contains("button", "ارسال").click()

    cy.url().should("include", "/pathFinder")

    cy.intercept("https://tile.openstreetmap.org/**").as("mapTiles")
    cy.wait("@mapTiles").its("response.statusCode").should("eq", 200)

    cy.get(".leaflet-overlay-pane path").should("have.length.greaterThan", 0)

    cy.get("img[alt]").should("have.length.greaterThan", 1)
  })
})
