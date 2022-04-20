const строкаОтсутсвия = 'Отсутствуют данные';

//таблица
export function таблица(description, ...options) {
  return cy.таблица(`${description}`, ...options)
}

//кнопки в тулбаре таблицы
//кнопка добавить запись
export function кнопкаДобавить() {
  return cy.кнопкаДобавить()
}

//кнопка добавить папку
export function кнопкаДобавитьПапку() {
  return cy.кнопкаДобавитьПапку()
}

//кнопка поиск
export function кнопкаПоиск() {
  return cy.кнопкаПоиск()
}

//поле поиск
export function полеПоиск() {
  return cy.полеПоиск()
}

//кнопка перейти выше по иерархии
export function кнопкаНазад() {
  return cy.кнопкаНазад()
}

//кнопка перенести
export function кнопкаПеренести() {
  return cy.кнопкаПеренести()
}

//кнопка удалить
export function кнопкаУдалить() {
  return cy.кнопкаУдалить()
}

//кнопка Редактировать в строке таблицы
export function кнопкаРедактировать() {
  return cy.кнопкаРедактировать()
}

export function кнопкаВнести() {
  return cy.кнопкаВнести()
}

//кнопка установить фильтр
export function кнопкаУстановитьФильтр() {
  return cy.кнопкаУстановитьФильтр()
}

//кнопка сбросить фильтр
export function кнопкаСброситьФильтр() {
  return cy.кнопкаСброситьФильтр()
}

//кнопка копировать
export function кнопкаКопировать() {
  return cy.кнопкаКопировать()
}

//кнопка перенести сюда
export function кнопкаПеренестиСюда() {
  return cy.кнопка(' Перенести cюда ')
}

//кнопка отмена
export function кнопкаОтмена() {
  return cy.кнопка('Отмена')
}

//кнопка объединить
export function Объединить() {
  return cy.кнопка(' Объединить ')
}

//кнопка Найти платеж
export function кнопкаНайтиПлатеж() {
  return cy.кнопка(' Найти платеж ')
}

//кнопка btn-more
export function кнопкаБольше() {
  return cy.кнопкаБольше()
}

//кнопка снять выделение
export function кнопкаСнятьВыделение() {
  return cy.кнопкаСнятьВыделение()
}

//кнопка суммировать записи
export function кнопкаСумма() {
  return cy.кнопкаСумма()
}

//кнопка печати отчета
export function кнопкаОбъединить() {
  return cy.кнопкаОбъединить()
}

//кнопка объединисть записи
export function кнопкаПечать() {
  return cy.кнопкаПечать()
}

//кнопка закрытия таблицы в модалке
export function кнопкаСохранить() {
  return cy.кнопкаСохранить()
}

//кнопка выбрать таблицы в модалке
export function кнопкаВыбрать() {
  return cy.кнопкаСохранитьИд('Выбрать')
}

//кнопки таблицы почтовые ящики
export function кнопкаОтправить(...options) {
  return cy.кнопка('Отправить', ...options).parent()
}

export function кнопкаПолучить() {
  return cy.кнопка('Получить')
}

export function кнопкаОчиститьКорзину() {
  return cy.кнопка('Очистить корзину')
}

export function кнопкаИстория() {
  return cy.кнопкаИстория()
}

export function кнопкаДобавитьПломбуИзРеестра() {
  return cy.кнопкаДобавитьПломбуИзРеестра()
}

export function кнопкаEditlink() {
  return cy.get('[data-cy="btn-editlink"]')
}

export function кнопкаДобавитьЮрЛицо() {
  return cy.contains('Добавить юр.лицо').parents('[data-cy="stack-btn"]');
}

export function кнопкаИзменитьТип() {
  return cy.contains('Изменить тип (физ/юр)').parents('[data-cy="stack-btn"]');
}

export function кнопкаСоздатьПлатежнуюВедомость() {
  return cy.найтиКнопку('Создать платежные ведомости')
}
//работа с отдельными элементами таблицы
//чекбокс в thead таблицы
export function отметитьВсе() {
  return cy.get('[data-cy="stack-table-head"]').within(() => {
    cy.get('th').eq(0).within(() => {
      cy.get('.v-input--selection-controls__ripple').click({
        force: true
      })
    })
  })
}

export function тулбар() {
  return cy.get('[data-cy="stack-table-toolbar"]');
}

// поиск строки в таблице по тексту аргумент текст
export function строкаТаблицыТекст(text) {
  return cy.строкаТаблицы(text)
}

//поиск строки по номеру tr
export function поискСтроки(num) {
  return cy.поискСтроки(num)
}

//поиск содержимого в определенной строке аргументы номер строки, текст
export function поискСтрокиТекст(num, text) {
  return cy.поискСтрокиТекст(`${num}`, `${text}`)
}

//поиск определенной ячейки
export function поискЯчейки(tr, td) {
  return cy.поискЯчейки(`${tr}`, `${td}`)
}

//нажать на чекбокс строки таблицы с определенным текстом
export function отметитьСтроку(text) {
  return cy.строкаТаблицы(text).within(() => {
    cy.чекбокс().click({
      force: true
    })
  })
}

//нажать на чекбокс строки таблицы с определенным текстом нажать редактировать
export function редактироватьСтроку(text) {
  return cy.строкаТаблицы(text).within(() => {
    cy.чекбокс().check({
      force: true
    })
    cy.кнопкаРедактировать().click()
  })
}

export function навестиКурсорНаСтрокуНажатьКнопкуРедактировать(text) {
  return cy.строкаТаблицы(text).trigger('mouseenteer').within(() => {
    cy.кнопкаРедактировать().click()
  })
}

export function проверитьКоличествоСтрок(количество) {
  return cy.get('tbody>tr').should('have.length', количество);
}

//поиск последней строки таблицы
export function последняяСтрокаТаблицы() {
  return cy.get('tbody>tr').last()
}

//поиск первой строки таблицы
export function перваяСтрокаТаблицы() {
  return cy.get('tbody>tr').first()
}

//поиск всех ячеек содержащих текст
export function ячейкаСТекстом(text) {
  return cy.get(`td :contains("${text}")`)
}

//поиск всех строк содержащих текст
export function строкаСТекстом(text) {
  return cy.get(`tr :contains(${text})`)
}

//поиск первой строки не содержащей текст
export function перваяСтрокаБезТекста(text) {
  return cy.get('tbody>tr').not(`:contains(${text})`).first()
}

//поиск последней строки не содержащей текст
//связанная функция найтиПослденююСтрокуБезТекстаПолучитьТекстЯчейки
export function последняяСтрокаБезТекста(text) {
  return cy.get('tbody>tr').not(`:contains("${text}")`).last()
}

//поиск строки не содержащей текст
export function cтрокаБезТекста(text) {
  return cy.get('tbody>tr').not(`:contains(${text})`)
}

//поиск класса в строках таблицы
export function cтрокаТаблицыКласс(text) {
  return cy.строкаТаблицыКласс(`${text}`)
}

//поиск папки в строках таблицы
export function строкаТаблицыПапка() {
  return cy.строкаТаблицыПапка()
}

//пероверка всех строк в таблице на содрежание текста
export function каждаяСтрокаТаблицыСодержитТекст(text) {
  cy.get('tbody>tr').each(($el) => {
    cy.wrap($el).contains(`${text}`, {
      matchCase: false
    })
  })
}

//проверка поиска в таблице
//аргументы url раздела, description таблицы, текст для ввода в поле Поиск, текст строки таблицы
export function поискВТаблице(url, tableName, textInput, stringName) {
  return cy.поискВТаблице(`${url}`, `${tableName}`, `${textInput}`, `${stringName}`)
}

//выбираем в таблице первую строку, алиасим текст первой строки
export function ОтметитьПервуюСтрокуТаблицы(tableName, td, alias) {
  cy.таблица(`${tableName}`).should('be.visible').within(() => {
    cy.progressBar().should('not.exist')
    cy.поискЯчейки(0, `${td}`).invoke('text').then(text => text.trim()).as(`${alias}`)
    cy.get(`@${alias}`).then((el) => {
      cy.строкаТаблицы(`${el}`).within(() => {
        cy.чекбокс().click({
          force: true
        })
      })
    })
  })
}

//erfpsdftv  в таблице строку, алиасим текст указанной ячейки
export function указатьТаблицуСтрокуЯчейкуПолучитьТекстОтметитьСтроку(tableName, tr, td, alias) {
  return таблица(`${tableName}`).should('be.visible').within(() => {
    cy.progressBar().should('not.exist');
    поискЯчейки(tr, td).invoke('text').then(text => text.trim()).as(`${alias}`);
    cy.get(`@${alias}`).then((el) => {
      строкаТаблицыТекст(`${el}`).within(() => {
        cy.чекбокс().click({
          force: true
        });
      });
    });
  });
}

//команды для работы с таблицей
//удаление всех строк в таблице с определенным текстом аргументы description таблицы, текст строки
export function удалитьСтрокиСТекстом(tableName, text) {
  return cy.удалитьСтрокиСТекстом(`${tableName}`, `${text}`)
}

//
export function нетСтрокиОтсутствуютДанные() {
  return cy.get(`tr :contains("${строкаОтсутсвия}")`).should('not.exist')
}

export function естьСтрокаОтсутствуютДанные() {
  return cy.get(`tr :contains("${строкаОтсутсвия}")`).should('exist')
}

//перезагрузка таблицы 
export function перезагрузкаТаблицы(tableName) {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBar().should('not.exist')
    cy.кнопкаБольше().last().click()
  })
  cy.строкаМеню('Обновить таблицу')
    .should('have.css', 'opacity', '1')
    .click({
      force: true
    })
    .should('not.be.visible')
}

//развернуть папки таблицы 
export function развернутьПапкиТаблицы(tableName) {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBar().should('not.exist')
    cy.кнопкаБольше().last().click()
  })
  cy.строкаМеню('Развернуть папки')
    .should('have.css', 'opacity', '1')
    .click({
      force: true
    })
    .should('not.be.visible')
}

//перезагрузка таблицы при наличии в таблице строки отсуствия
export function перезагрузитьТаблицуЕслиНетСтрок(tableName) {
  cy.таблица(`${tableName}`).then(($table) => {
    if ($table.text().includes(строкаОтсутсвия)) {
      cy.перезагрузкаТаблицы(`${tableName}`)
    }
  })
}

//поиск в заголовке таблицы
export function поискВЗаголовке(text) {
  return cy.поискВЗаголовке(`${text}`)
}

//получение текста ячейки аргументы номер строки, номер ячейки, значение псевдонима
export function получитьТекстЯчейки(tr, td, alias) {
  return cy.поискЯчейки(`${tr}`, `${td}`)
    .invoke('text')
    .then(text => text.trim()).as(`${alias}`)
}

//получение текста ячейки определенной строки не содержащей текст аргументы текст строки, номер ячейки, алиас
//связанная функция последняяCтрокаБезТекста()
export function найтиПоследнююСтрокуБезТекстаПолучитьТекстЯчейки(text, td, alias) {
  последняяСтрокаБезТекста(text)
    .find('td')
    .eq(td)
    .invoke('text')
    .then(text => text.trim()).as(`${alias}`)

}



//вызывается внутри строки таблицы аргументы номер ячейки, псевдоним 
export function назначитьПсевдонимТекстуЯчейкиИзСтроки(tdnum, alias) {
  cy.get('td')
    .eq(tdnum)
    .invoke('text')
    .then(text => text.trim())
    .as(`${alias}`)
}

//получение текста ячейки определенной строки содержащей текст аргументы текст строки, номер ячейки, алиас
export function найтиСтрокуСТекстомПолучитьТекстЯчейки(text, td, alias) {
  cy.строкаТаблицы(text)
    .find('td')
    .eq(td)
    .invoke('text')
    .then(text => text.trim())
    .as(`${alias}`)
}

//тест поиска по таблице аргументы номер строки номер ячейки функция 
export function получитьТекстЯчейкиЗаполнитьПолеПоискПроверитьОтбор(trnum, tdnum) {
  cy.поискЯчейки(trnum, tdnum)
    .invoke('text').then(text => {
      кнопкаПоиск().click()
      полеПоиск().type(text.trim())
      строкаСТекстом(text).should('exist')
      cтрокаБезТекста(text).should('not.exist')
    })
}

//удаление всех записей из таблицы аргументы название таблицы выполнять в корне
export function удалитьВсеЗаписиВТаблице(tabledescription) {
  таблица(tabledescription).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    отметитьВсе()
    кнопкаУдалить().click()
  })
  cy.подтвердитьУдаление()
  таблица(tabledescription).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
  })
}

//нажать на чекбокс всех строк с определенным текстом аргументы название таблицы текст для поиска
export function отметитьСтрокиСТекстом(tabledescription, text) {
  таблица(tabledescription).find('tr').each(($el) => {
    if ($el.text().includes(`${text}`)) {
      cy.wrap($el).within(() => {
        cy.чекбокс().click({
          force: true
        });
      })
    }
  })
}

//получает все строки внутри тела таблицы проверяет отсутсвие текста аргументы название таблицы, текст поиска
export function получитьВсеСтрокиПроверитьОтсутсвиеТекста(tabledescription, text) {
  таблица(tabledescription).find('tbody>tr').each(($el) => {
    cy.wrap($el).should('not.contain', text)
  })
}

//получает все строки внутри тела таблицы проверяет наличие текста аргументы название таблицы, текст поиска
export function получитьВсеСтрокиПроверитьНаличиеТекста(tabledescription, text) {
  таблица(tabledescription).find('tbody>tr').each(($el) => {
    cy.wrap($el).should('contain', text)
  })
}



//разное
//строка списка Организация: Акт сверки 
export function актСверки() {
  return cy.contains('Организация: Акт сверки')
}

//строка списка Организация: Реестр счетов-фактур
export function реестрСчетовФактур() {
  return cy.contains('Организация: Реестр счетов-фактур')
}

export function НазадПоИерархииЕслиКнопкаАктивна(tableName) {
  cy.таблица(`${tableName}`).find(`[data-cy="btn-up"]`).each(($el) => {
    if ($el.is(':enabled')) {
      cy.таблица(`${tableName}`).within(() => {
        cy.progressBarTimeout(60000).should('not.exist')
        cy.кнопкаНазад().click()
      })
    }
    cy.кнопкаНазад().should('be.disabled');
  })
}

export function очиститьПоиск(tableDescription) {
  return таблица(tableDescription).within(() => {
    кнопкаСброситьФильтр().click();
    cy.progressBarTimeout(30000).should('exist');
    cy.progressBarTimeout(30000).should('not.exist');
  })
}

export function нажатьСброситьФильтрЕслиФильтрНеСброшен() {
  кнопкаУстановитьФильтр().then($btn => {
    if ($btn.hasClass('warning--text')) {
      кнопкаСброситьФильтр().click();
      cy.подождатьЗагрузку(10000);
    }
  })
}

export function очиститьПолеПоиск() {
  полеПоиск().clear();
  cy.подождатьЗагрузку(10000);
}

export function получитьСуммуЧиселВСтолбце(номерСтолбца, aliasName) {
  cy.get(`td:nth-child(${номерСтолбца})`)
    .then(function ($cells) {
      const totals = $cells
        .toArray() //все содержимое столбца в массив
        .map(function (el) {
          return el.innerText //выбираем текст ячеек
        })
        .map(function (s) {
          return s.replace(/\s/g, '') //обрезаем пробелы
        })
        .map(parseFloat) //приводим в числу (можно и к целому)
      console.log(totals);  
      const sum = Cypress._.sum(totals) //библа lodash._. метод sum получает сумму всех элементов в массиве
      return sum
    }).as(`${aliasName}`);
}