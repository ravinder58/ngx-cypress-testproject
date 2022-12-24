/// <reference types="cypress" />  


// above reference is the intellisense and it shows suggestions when we are using the cypress

describe("First Test suite", () => {

it('first test',() => {


    cy.visit('/');

    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
  // by Tag name
    cy.get('input')

    // by ID
    cy.get('#inputEmail1')

    // by Class name
    cy.get('.input-full-width')

    //by Attribute name and value

    cy.get('[placeholder="Email"]')

    //by Class Attribute  and value 

    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by Tag name and value

    cy.get('input[placeholder="Email"]')

    //by two different attributes in one locators

    cy.get('[placeholder="Email"][type="email"]')

    //by tag name, Attribute with value, ID and Class name


    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
    

    // The most recommended way of finding the element, according to the udemy course not preffered in general
    //  to create our own attribute

    cy.get('[data-cy="imputEmail1"]')

})

it('second test ',() =>
{
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    //First Sign-In button
    // User defined locator in the code
    cy.get('[data-cy="signInButton"]') 


    //Second Sign-In button
    cy.contains('[status="warning"]','Sign in');
    
    //Traversing the Sign in using chaining of the parent and child
    cy.get('#inputEmail3')
    .parents('form')
    .find('button')
    .should('contain','Sign in')
    .parents('form')
    .find('nb-checkbox')
    .click()

    // This is used if we have just the heading text unique and nothing else, we can traverse it with this method
    // of selecting the locator email

    cy.contains('nb-card','Horizontal form').find('[type="email"]');

})


it.only('then and wrap methods',()=>
{

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
     
    cy.contains('nb-card','Using the Grid').then(firstForm => 
        {

            //Chai is the jQuery assertion library and not the cypress assertion library
            // All of this syntax is related to the Chai assertion.
           const emailLabelFirst=firstForm.find('[for="inputEmail1"]').text()
           const passwordLableFirst=firstForm.find('[for="inputPassword2"]').text()
           expect(emailLabelFirst).to.equal('Email')
           expect(passwordLableFirst).to.equal('Password')
        

    cy.contains('nb-card','Basic form').then(secondForm => 
            {
               const emailLabelSecond=secondForm.find('[for="exampleInputEmail1"]').text()
               const passwordLableSecond=secondForm.find('[for="exampleInputPassword1"]').text()
               expect(emailLabelSecond).to.equal('Email address')
               expect(passwordLableSecond).to.equal(passwordLableFirst)

               //Switching back to the Cypress assertions from the JQuery assertions.
               cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            })

        })

})

})