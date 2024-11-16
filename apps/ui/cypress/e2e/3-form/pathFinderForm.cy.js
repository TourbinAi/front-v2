/// <reference types="cypress" />

describe("PathFinderForm Component", () => {
  beforeEach(() => {
    // قبل از هر تست، از صفحه‌ی موردنظر بازدید کنید
    cy.visit("/pathFinder") // آدرس مربوط به صفحه‌ای که این فرم در آن وجود دارد را جایگزین کنید
  })

  it("should render the form correctly", () => {
    // بررسی کنید که ورودی‌ها و دکمه‌ها در صفحه وجود دارند
    cy.contains("Origin") // چک کردن عنوان ورودی مبدا
    cy.contains("Destination") // چک کردن عنوان ورودی مقصد
    cy.contains("Submit") // چک کردن دکمه ارسال
  })

  it("should allow user to enter origin and destination", () => {
    // وارد کردن مقدار در فیلد مبدا
    cy.get('[placeholder="Enter origin"]').type("Tehran") // متن placeholder خود را جایگزین کنید
    cy.wait(1000) // شبیه‌سازی تاخیر برای نمایش نتایج

    // انتخاب یکی از پیشنهادات
    cy.get(".autocomplete-item").first().click() // کلاس مربوط به پیشنهادات را جایگزین کنید

    // وارد کردن مقدار در فیلد مقصد
    cy.get('[placeholder="Enter destination"]').type("Shiraz") // متن placeholder خود را جایگزین کنید
    cy.wait(1000)

    // انتخاب یکی از پیشنهادات
    cy.get(".autocomplete-item").first().click()
  })

  it("should submit the form with selected origin and destination", () => {
    // وارد کردن مقدار و انتخاب مبدا
    cy.get('[placeholder="Enter origin"]').type("Tehran")
    cy.wait(1000)
    cy.get(".autocomplete-item").first().click()

    // وارد کردن مقدار و انتخاب مقصد
    cy.get('[placeholder="Enter destination"]').type("Shiraz")
    cy.wait(1000)
    cy.get(".autocomplete-item").first().click()

    // کلیک روی دکمه ارسال
    cy.get('button[type="submit"]').click()

    // تایید اینکه کاربر به صفحه بعدی هدایت می‌شود
    cy.url().should("include", "/pathFinder?origin=") // آدرس نهایی خود را جایگزین کنید
  })
})
