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

it('then and wrap methods',()=>
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

it('invoke command',() =>
{
 
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    //1 
    cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

    //2

    cy.get('[for="exampleInputEmail1"]').then( label =>
        {
            expect(label.text()).to.equal('Email address')
        })
     //3

     cy.get('[for="exampleInputEmail1"]').invoke('text').then(text =>
        {

            expect(text).to.equal('Email address')
        })
    //4 Check whether the check box is checked or not

    cy.contains('nb-card','Basic form')
    .find('nb-checkbox')
    .click()
    .find('.custom-checkbox')
    .invoke('attr','class')
    .should('contain','checked')
})

it('assert property',() =>
{

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card','Common Datepicker').find('input').then (input =>
        {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('25').click()
            // Assertion to verify that correct date is selected
            cy.wrap(input).invoke('prop','value').should('contain','Dec 25, 2022')
        })

})

it('radio button',() =>
{

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card','Using the Grid').find('[type="radio"]').then( radioButton =>
        {    

            //Selecting first Radio button
            cy.wrap(radioButton)
            .first()
            .check({force: true})
            .should('be.checked')

            
            //Selecting second Radio button
            cy.wrap(radioButton)
            .eq(1)
            .check({force: true})

            cy.wrap(radioButton)
            .first()
            .should('not.be.checked')


            //Checking third Radio button is Disabled

            cy.wrap(radioButton)
            .eq(2)
            .should('be.disabled')
        })
})

it('check boxes',() =>
{
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    //check command checks all the elements in the checkbox
    // cy.get('[type="checkbox"]').check({force:true})

    cy.get('[type="checkbox"]').eq(0).click({force:true})
    cy.get('[type="checkbox"]').eq(1).click({force:true})



})

it('lists and dropdowns',() =>
{
    cy.visit('/');

    1
    cy.get('nav nb-select').click()
    cy.get('.options-list').contains('Dark').click();
    //assertion to verify that color has changed

    cy.get('nb-layout-header nav').should('have.css','background-color','rgb(34, 43, 69)')
    
    //assertion to verify that the value in the dropdown has been changed to the dark
    cy.get('nav nb-select ').should('contain','Dark')

    //2
    cy.get('nav nb-select').then(dropdown => {
     
        cy.wrap(dropdown).click()
        cy.get('.options-list nb-option').each((listItem, index) => 
            {
                const itemText=listItem.text().trim()

                const colors =
                {
                    "Light":"rgb(255, 255, 255)" ,
                    "Dark": "rgb(34, 43, 69)" ,
                    "Cosmic": "rgb(50, 50, 89)" ,
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain',itemText)
                cy.get('nb-layout-header nav').should('have.css','background-color',colors[itemText])
                if(index < 3)
                {
                cy.wrap(dropdown).click()
                }

            })


     })

})

// work with the Web Table and select a particular row value and update it
// for example here we'll update the age value of the Larry person

it('web tables',() =>
{
    cy.visit('/');
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()


        //1-----------------------------------1
        // updating the existing record in the web table
    cy.get('tbody').contains('tr','Larry').then( tableRow =>
        {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            // assertion to check whether the updated value is correct
            cy.wrap(tableRow).find('td').eq(6).should('contain','25')
              
        })

    //2-----------------------------------2
    // adding the value in the existing web table

    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then( tableRow => 
    {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Alexis')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Neyon')
        cy.wrap(tableRow).find('.nb-checkmark').click()

    })
    // assertion to check whether the added value is displayed in the table, verify all the columns
    cy.get('tbody tr').first().find('td').then( tableColumns =>
        {
            cy.wrap(tableColumns).eq(2).should('contain','Alexis')
            cy.wrap(tableColumns).eq(3).should('contain','Neyon')
        })

    //3-----------------------------------3 
    // verify the search/Filter functionality in the web table 

    const age =[20,30,40,200]
    cy.wrap(age).each(age =>
        {
            cy.get('thead [placeholder="Age"]').clear().type(age).click()
            cy.get('tbody tr ').each(tableRow =>
            {
                if(age == 200)
                {
                    cy.wrap(tableRow).should('contain','No data found')
                }
                else
                {
                   //assertion to verify that table row age contains value 20
                cy.wrap(tableRow).find('td').eq(6).should('contain',age) 
                }
                
            })
        })

    
})

it('Date Picker',() =>
{
    function selectDayFromCurrent(day) {

        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', { month: 'short' })
        let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
            if (!dateAttribute.includes(futureMonth)) {
                cy.get('[data-name="chevron-right"]').click()
                selectDayFromCurrent(day)
                // cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
            }
            else {
                cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()

            }

        })
        return dateAssert
    }

    cy.visit('/');
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card','Common Datepicker').find('input').then (input =>
        {
            cy.wrap(input).click()
            let dateAssert= selectDayFromCurrent(104)
            cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
            
        })
    })

it('tool tips', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()

        //assertion to verify the content of the tooltip
        cy.get('nb-tooltip').should('contain','This is a tooltip')

})

it.only('dialog box', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1

    // // Select confirm on the dialog box
    // cy.get('tbody tr').first().find('.nb-trash').click()
    // // If the event was fired only with the window:confirm thing
    // cy.on('window:confirm', (confirm)=> 
    // {
    //      expect(confirm).to.equal('Are you sure you want to delete?')  
    // })


    // // 2 
    // // Select confirm with the stub approac
    // const stub= cy.stub()     // stubs and mocks for the functions
    // cy.on('window:confirm', stub)
    // cy.get('tbody tr').first().find('.nb-trash').click().then(()=>
    // {
    //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')

    // })

    //3
    // Select cancel on the dialog box
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false) 
   


})

})
