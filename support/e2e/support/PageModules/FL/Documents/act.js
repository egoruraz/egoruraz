import {
  таблица,
  кнопкаУстановитьФильтр,
  отметитьСтроку
} from '/tests/e2e/support/PageModules/stack-table.js';

import {
  ПерейтиПоАдресу
} from '/tests/e2e/support/PageModules/table-filter.js';

export function диалог(...options) {
  return cy.диалог('АктыСнятияКачества', ...options);
}

export function диалогЛицевые(...options) {
  return cy.диалог('АктыСнятияКачества.Лицевые', ...options);
} 

export function НазваниеРаздела() {
  return cy.полеСтрока('Название раздела');
}

export function ДатаОпределяетСортировку() {
  return cy.полеДата('Дата (определяет сортировку)');
}

export function датаС() {
  return cy.полеДата('с');
}

export function датаПо() {
  return cy.полеДата('по');
}

//поля ввода диалога
export function Номер() {
  return cy.полеСтрока('Номер');
}

export function Тема() {
  return cy.полеСтрока('Тема');
}

export function Дата() {
  return cy.полеДата('Дата');
}

export function РасчетныйМесяц() {
  return cy.полеДата('Расчетный месяц');
}

export function Коэффициент() {
  return cy.полеСтрока('Коэффициент');
}

export function ЧасовОтсутствия() {
  return cy.полеСтрока('Часов отуствия');
}

export function ВидУхудшенияКачества() {
  return cy.полеСвязиИнпут('Вид ухудшения качества');
}

export function очиститьВидУхудшенияКачества() {
  return cy.полеСвязи('Вид ухудшения качества').within(() => {
    cy.get('button').eq(2).click();
  });
}

export function Услуга() {
  return cy.полеСвязиИнпут('Услуга');
}

export function ВиновникНедопоставки() {
  return cy.полеСвязиИнпут('Виновник недопоставки');
}

export function Наименование() {
  return cy.полеСтрока('Наименование');
}

//кнопки
export function кнопкаРассчитать() {
  return cy.кнопка('Рассчитать');
}

//вкладка Расчет коэффициента
export function вкладкаРасчетКоэффициента() {
  return cy.вкладка('#rasch');
}

export function РассчитанныйКоэффициент() {
  return cy.полеСтрока('Рассчитанный коэффициент');
}

export function НормативнаяТемпература() {
  return cy.полеСтрока('Нормативная температура');
}

export function Температура() {
  return cy.полеСтрока('Температура');
}

export function ПлощадьКомнат() {
  return cy.get('[data-test-id^=Площадь]');
}

//поля ввода диалога Лицевые
export function ВремяС() {
  return cy.полеСтрока('с');
}

export function ВремяПо() {
  return cy.полеСтрока('по');
}

export function ПоЛицевомуСчету() {
  return cy.полеСвязиИнпут('По лицевому счету')
}

export function Подъезды() {
  return cy.свич('Подъезды');
}

export function Этажи() {
  return cy.свич('Этажи');
}

export function УправляющаяКомпания() {
  return cy.полеСвязиИнпут('Управляющая компания/Прямой договор');
}

export function Поставщик() {
  return cy.полеСвязиИнпут('Поставщик');
}

//! TODO Якоря
export function ПодъездС() {
  return cy.get('[data-cy="stack-input"]').eq(4);
}

export function ПодъездПо() {
  return cy.get('[data-cy="stack-input"]').eq(5);
}

export function ЭтажС() {
  return cy.get('[data-cy="stack-input"]').eq(6);
}

export function ЭтажПо() {
  return cy.get('[data-cy="stack-input"]').eq(7);
}


export function заполнитьПолеПоЛицевомуСчету(улица, дом, адрес) {
  cy.полеСвязиСвязь('По лицевому счету').last().click();
  cy.fixture('table_descriptions').then(function (table) {
    this.table = table;
    таблица(this.table.Адреса).within(() => {
      cy.progressBarTimeout(10000).should('not.exist');
      кнопкаУстановитьФильтр().click();
    });
    cy.заполнитьКомбобоксВвестиТекст('Улица', 'ulica', `${улица}`);
    if( дом != '0') {
      cy.заполнитьКомбобоксВвестиТекст('Дом', 'dom', `${дом}`);
    }    
    cy.progressBar().should('not.exist');
    ПерейтиПоАдресу().click();
    таблица(this.table.Адреса).within(() => {
      cy.подождатьЗагрузку(10000);
      отметитьСтроку(`${адрес}`);      
    });
    cy.кнопкаСохранитьИд('Выбрать').click();
    таблица(this.table.Адреса).should('not.exist');
  });
}