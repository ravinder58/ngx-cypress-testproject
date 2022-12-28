/// <reference types="cypress" />

import { ondatePickerPage } from "../../support/page_Objects/datePickerPage"
import { onformLayoutPage } from "../../support/page_Objects/formLayoutPage"
import { navigateTo } from "../../support/page_Objects/navigationPage"
import { onSmartTablePage } from "../../support/page_Objects/smartTablePage"



describe('Test with Page Objects', ()=>
{


beforeEach('open application' ,()=>
{
    cy.openHomePage( )
})

it('verify Navigation across the pages',() =>
{
   
    navigateTo.formsLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.smartTablePage()
    navigateTo.toasterPage()
    navigateTo.tooltipPage()
})

it(' should submit Inline form and Basic form and select tomorrow date in the calendar', ()=>
{

    navigateTo.formsLayoutsPage()
    onformLayoutPage.submitInlineFormWithNameAndEmail('Alexis Neon','alexisneon@ar=atwater.com')
    onformLayoutPage.submitBasicFormwithEmailAndPassword('test@test.com','password')
    navigateTo.datepickerPage()
    ondatePickerPage.selectCommonDatepickerDateFromToday(1)
    ondatePickerPage.selectDatepickerwithRangeDateFromToday(5,8)

})

it.only(' should be able to work with the web table to add, update and delete records', ()=>
{

    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastNAME('Alexis','Lionel')
    onSmartTablePage.updatingAgebyFirstName('Alexis','54')
    onSmartTablePage.deletRowByIndex(1)
})

})