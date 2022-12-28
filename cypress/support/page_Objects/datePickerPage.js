
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
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()

        }

    })
    return dateAssert
}

export class datePickerPage {

    selectCommonDatepickerDateFromToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value',dateAssert)

        })
  
}

selectDatepickerwithRangeDateFromToday(firstDay,secondDay) {
    cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
        cy.wrap(input).click()
        let firstdateAssert = selectDayFromCurrent(firstDay)
        let seconddateAssert = selectDayFromCurrent(secondDay)
        const finalDate=firstdateAssert+' - '+seconddateAssert
        cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
        cy.wrap(input).should('have.value',finalDate)

    })

}
}

export const ondatePickerPage= new datePickerPage()
