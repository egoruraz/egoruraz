export function requestDelete(url, objectName, номерЗаписи) {
  return cy.sendRequest(
    `${url}`,
    `${Cypress.env('token')}`,
    objectName,
    'удалить', {
      'номерЗаписи': номерЗаписи
    })
}