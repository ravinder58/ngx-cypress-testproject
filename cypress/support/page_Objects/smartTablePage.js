export class smartTable {

updatingAgebyFirstName(name,age)
{

cy.get('tbody').contains('tr',name).then( tableRow =>
    {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
        cy.wrap(tableRow).find('.nb-checkmark').click()
        // assertion to check whether the updated value is correct
        cy.wrap(tableRow).find('td').eq(6).should('contain',age)
          
    })
}

addNewRecordWithFirstAndLastNAME(fname,lname)
{

    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then( tableRow => 
    {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type(fname)
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lname)
        cy.wrap(tableRow).find('.nb-checkmark').click()

    })
    // assertion to check whether the added value is displayed in the table, verify all the columns
    cy.get('tbody tr').first().find('td').then( tableColumns =>
        {
            cy.wrap(tableColumns).eq(2).should('contain',fname)
            cy.wrap(tableColumns).eq(3).should('contain',lname)
        })
}


deletRowByIndex(index)
{
    const stub= cy.stub()     // stubs and mocks for the functions
    cy.on('window:confirm', stub)
    cy.get('tbody tr').eq(index).find('.nb-trash').click().then(()=>
    {
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')

    })
}
}


export const onSmartTablePage = new smartTable()

