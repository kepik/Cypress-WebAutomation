describe ('Javascript Alert', ()=> {
    beforeEach ( ()=> {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts")
    })
    //Alert OK
    it('JS Alert OK', ()=> {
        cy.get("button[onclick='jsAlert()']").click()
        
        //validate text on the alert
        cy.on('window:alert', (t)=>{
            expect(t).to.contains("I am a JS Alert")
        })

        //validate the result of alert
        cy.get('#result').should('have.text','You successfully clicked an alert')
    })
    
    //Confirm Alert - OK
    it.skip('JS Confirm OK', ()=> {
        cy.get("button[onclick='jsConfirm()']").click()
        
        //validate text on the alert
        cy.on('window:confirm', (t)=>{
            expect(t).to.contains("I am a JS Confirm")
        })

        //validate the result of clicking OK
        cy.get('#result').should('have.text','You clicked: Ok')
    })

    //Confirm Alert - Cancel
    it('JS Confirm Cancel', ()=> {
        cy.get("button[onclick='jsConfirm()']").click()
        
        //validate text on the alert
        cy.on('window:confirm', (t)=>{
            expect(t).to.contains("I am a JS Confirm")
        })

        //click Cancel
        cy.on('window:confirm', ()=> false)

        //validate the result of clicking OK
        cy.get('#result').should('have.text','You clicked: Cancel')
    })

    //Prompt Alert - input text OK
    it('JS Prompt Alert', ()=> {
        cy.window().then((inputText)=> {
            cy.stub(inputText,'prompt').returns("Hello World!")
        })
        cy.get("button[onclick='jsPrompt()']").click()
        cy.get('#result').should('have.text','You entered: Hello World!')
    })

})

describe ('Authenticated Alert', ()=> {
    it.skip('login alert', ()=> {
        cy.visit("https://the-internet.herokuapp.com/basic_auth", 
            { auth: {
                username: "admin",
                password: "admin"
            }}
        )

        cy.get("div[class='example'] p").should('have.contain', "Congratulations!")
    })

    it.only('login through url', ()=> {
        cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth")
        cy.get("div[class='example'] p").should('have.contain', "Congratulations!")
    })
})