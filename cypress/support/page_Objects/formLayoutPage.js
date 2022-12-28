

export class formsLayoutsPage {
    
    submitInlineFormWithNameAndEmail(name,email)
    {
     cy.contains('nb-card','Inline form').find('form').then(form =>
        {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit()
        })

    }
    submitBasicFormwithEmailAndPassword(email,pwd)
    {
        cy.contains('nb-card','Basic form').find('form').then(form => 
            {
                cy.wrap(form).find('#exampleInputEmail1').type(email)
                cy.wrap(form).find('#exampleInputPassword1').type(pwd)
                cy.wrap(form).find('[type="checkbox"]').check({force:true})
                cy.wrap(form).submit()
            })


    }

}
export const onformLayoutPage = new formsLayoutsPage()