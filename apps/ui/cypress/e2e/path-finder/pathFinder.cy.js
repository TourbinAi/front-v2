/// <reference types="cypress" />

describe("PathFinderForm Component", () => {
  beforeEach(() => {
    cy.viewport(1220, 700)
    cy.visit("http://localhost:3000/fa")
  })
  it("go to pathFinder page", () => {
    cy.window().then((win) => {
      const screenWidth = win.innerWidth

      if (screenWidth < 1021) {
        cy.get('button[aria-label="Toggle site navigation"]').click()
        cy.get('a[href="/fa/pathFinder"]').eq(0).click({ force: true })
      } else {
        cy.contains("a", "مسیریاب").should("be.visible").click()
      }
    })

    cy.url().should("include", "/pathFinder")

    cy.intercept("https://tile.openstreetmap.org/**").as("mapTiles")
    cy.wait("@mapTiles").its("response.statusCode").should("eq", 200)

    cy.contains("label", "مبدأ").should("be.visible")
    cy.get('input[placeholder="مبدأ را وارد کنید"]').should("exist")
    cy.contains("label", "مقصد 1").should("be.visible")
    cy.get('input[placeholder="مقصد را وارد کنید"]').should("exist")
    cy.contains("button", "افزودن مقصد").should("be.visible").click()

    cy.get('[placeholder="مبدأ را وارد کنید"]').type("تهران")
    cy.get('[role="option"]').should("be.visible").first().click()

    const destinations = ["بیرجند", "شیراز"]
    destinations.forEach((destination, index) => {
      cy.get('[placeholder="مقصد را وارد کنید"]').eq(index).type(destination)

      cy.get('[role="option"]').should("be.visible").first().click()
    })
  })
})
