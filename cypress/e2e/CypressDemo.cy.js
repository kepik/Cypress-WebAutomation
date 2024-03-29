import Login from "../pageObjects/LoginPage"

describe('demoblaze page', () => {

  let userdata;
  before( ()=> {
    cy.fixture("userData").then((data)=>{
      userdata=data;
    })
  })

  beforeEach( ()=> {
    cy.visit('https://www.demoblaze.com/')
    cy.title().should('eq','STORE')
    cy.wait(1000)
  })

  function loginUser() {
    const loginPage = new Login();

    cy.get("[data-target='#logInModal']").click()
    cy.wait(2000)
    
    //cy.fixture("userLogin").then( (data)=> {
      loginPage.setUserName(userdata.username)
      cy.wait(1000)
      loginPage.setUserPass(userdata.password)
      cy.wait(1000)
    //})

    cy.get("[onclick='logIn()']").contains("Log in").click()
    cy.wait(3000)
  
    cy.get("#nameofuser").should('exist')
  }
  function searchProduct() {
    cy.get(".list-group-item").contains("Phones").click()
    cy.wait(1000)
  //  cy.get(".hrefch").contains("Iphone 6 32gb").click()
    cy.clickProduct(userdata.productName)
    cy.wait(1000)
  }
  function addToCart() {
    cy.get("a.btn").contains("Add to cart").click()
  
    cy.wait(3000)
  }
  function cartPage (){
    cy.get("a#cartur").click()
    cy.wait(2000)
    cy.get("[data-target='#orderModal']").contains("Place Order").click() 
  }
  function inputUserOrder(){
    cy.get("input#name").click()
    cy.get("input#name").type(userdata.name)
    cy.wait(1000)
    cy.get("input#country").type(userdata.country)
    cy.wait(1000)
    cy.get("input#city").type(userdata.city)
    cy.wait(1000)
    cy.get("input#card").type(userdata.card)
    cy.wait(1000)
    cy.get("input#month").type(userdata.month)
    cy.wait(1000)
    cy.get("input#year").type(userdata.year)
    cy.wait(2000)

    cy.get("[onclick='purchaseOrder()']").contains("Purchase").click()
  }
  function confirmOrder() {
    cy.get("[style='display: inline-block;']").click()
    cy.wait(1000)
    cy.get("p.lead").should('exist')
  }
  function logoutUser(){
    cy.get("[onclick='logOut()']").click()
    cy.wait(2000)
    cy.get("[data-target='#logInModal']").should('exist')
  }

  it ('login and order product', ()=>{
    loginUser()
    searchProduct()
    addToCart()
    cartPage()
    inputUserOrder()
    confirmOrder()
  })

  it ('login and logout', ()=>{
    loginUser()
    logoutUser()
  })

})

