
describe('empty spec', () => {
  it('passes', () => {
    // ubah di sini untuk paramter nya
    let itemName = 'ASUS Chromebook Enterprise C523, 15.6 FHD NanoEdge Display with 180 DegreeHinge, Intel Celeron N3350, 4GB LPDDR4, 64GB, Zero-Touch Enrollment, Chrome OS with Chrome Enterprise Upgrade, C523NA-GE44F-P'
    let qty = '2'
    let cartIsEmpty = "Your Amazon Cart is empty."

    // script tes di sini
    cy.visit('https://www.amazon.com/');
    cy.get('.glow-toaster-footer', { timeout: 10000 })
    cy.get('#twotabsearchtextbox').type('computer');
    cy.get('#nav-search-submit-button').click();

    const searchEachPage = (n) => {
      n++;
      if (n <= 20) {
        console.log(n);
        cy.contains('span', itemName, { timeout: 10000 })
          .should((_) => { })
          .then(($span) => {
            if (!$span.length) {
              // Todo: patikan enable
              cy.get('.s-pagination-next')
                .invoke('attr', 'class')
                .then(classNames => {
                  if (classNames.includes("s-pagination-disabled")) {
                    console.log(classNames)
                    console.log("Item Not Found")
                  } else {
                    console.log(classNames)
                    cy.get('.s-pagination-next').click();
                    searchEachPage(n);
                  }
                })
            } else {
              cy.wrap($span).click()

              cy.get('#a-autoid-0-announce').click()
              cy.get(`#quantity_${qty}`).click()
              cy.get('#add-to-cart-button').click()
              cy.get('#attach-sidesheet-view-cart-button > span > input').click()
              cy.get('.sc-action-delete > .a-declarative > .a-color-link').click()
              cy.get('.a-row > .a-spacing-mini')
                .should(($text) => {
                  expect($text, 'Cart is Empty').to.contain(cartIsEmpty)
                })
            }
          })
      }
    }
    searchEachPage(0)
  })
})