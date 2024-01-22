class Login {
    setUserName(username){
        cy.get("input#loginusername").type(username)
    }
    setUserPass(password){
        cy.get("input#loginpassword").type(password)
    }
}

export default Login;