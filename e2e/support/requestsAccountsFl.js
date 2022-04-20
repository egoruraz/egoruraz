import {
  findFieldReturnValue
} from '/tests/e2e/support/functions';

export function getAccountId(url, номерлс, alias) {
  let params = {
    "фильтр": {
      "номерлс": номерлс,
      "развернутьПапки": 1,
      "сКорня": 1,
      "переход": false
    }
  }
  return cy.fixture('objectName').then(function (object) {
    this.object = object;
    cy.fixture('methodName').then(function (method) {
      this.method = method;
      cy.выполнитьЗапрос(
        `${url}`,
        `${Cypress.env('token')}`,
        this.object.ЛицевыеСчета,
        this.method.получить,
        params).then(response => {
          return findFieldReturnValue(response, "$номерЗаписи")
        }).as(`${alias}`);
    });
  });
}

export function calculateAccount(url, RowIdЛицевогоСчета) {
  let params = {
    "номерЗаписи": RowIdЛицевогоСчета
  }
  return cy.fixture('objectName').then(function (object) {
    this.object = object;
    cy.fixture('methodName').then(function (method) {
      this.method = method;
      cy.выполнитьЗапрос(
        `${url}`,
        `${Cypress.env('token')}`,
        this.object.ЛицевыеСчета,
        this.method.Рассчитать,
        params);
    });
  });
}

export function getAccountCalculation(url, RowIdЛицевогоСчета, месяц) {
  let params = {
    "владелец": RowIdЛицевогоСчета,
    "фильтр": {},
    "месяц": `${месяц}`,
    "папка": -10,
    "показыватьУзлы": 1,
    "развернутьПапки": 1
  }
  return cy.fixture('objectName').then(function (object) {
    this.object = object;
    cy.fixture('methodName').then(function (method) {
      this.method = method;
      cy.выполнитьЗапрос(
        `${url}`,
        `${Cypress.env('token')}`,
        this.object.ЛицевыеСчетаРасчет,
        this.method.получить,
        params)
    });
  });
}
