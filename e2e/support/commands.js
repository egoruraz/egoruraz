///<reference types="cypress"/>
import 'cypress-file-upload';
import "cypress-localstorage-commands";
import 'cypress-wait-until';
import '@bahmutov/cy-api/support';

// https://on.cypress.io/custom-commands


Cypress.Commands.add('getToken', () => {
  cy.request({
    method: 'post',
    url: Cypress.env('authLogin'),
    body: {
      forceLogin: true,
      fingerprint: "",
      secret: Cypress.env('password'),
      task: "fl",
      userID: Cypress.env('login'),
    }
  }, {
    retryOnStatusCodeFailure: true
  })
    .then((response) => {
      Cypress.env('token', response.body.accessToken);
      return response
    })
    .then(() => {
      cy.request({
        method: 'post',
        url: Cypress.env('getsystemstatefl'),
        headers: {
          'S-Access-Token': `${Cypress.env('token')}`
        },
        body: {}
      }, {
        retryOnStatusCodeFailure: true
      })
        .then((response) => {
          const body = JSON.stringify(response.body);
          cy.log(body);
        })
        .then((response) => {
          Cypress.env('openMonth', response.body.tasks[0].result.открытыйМесяц);
          return response
        })
    })
})

/**
 * работа с диалогом
 */
// поиск диалога
Cypress.Commands.add('диалог', (testId, ...options) => {
  return cy.get(`[data-cy=stack-dialog]${testId ? `[data-test-id="${testId}"]` : ''}`, ...options);
});

//диалог без id
Cypress.Commands.add('диалогБезИд', (...options) => {
  return cy.get('[data-cy=stack-dialog]', ...options);
});


/**
 * работа с таблицей
 */
//перезагрузка таблицы команда выполняется вне вложений within
Cypress.Commands.add('перезагрузкаТаблицы', (description) => {
  cy.get(`[data-cy=stack-table]${description ? `[description="${description}"]` : ''}`).within(() => {
    cy.get('[data-cy="stack-table-btn-more"]').click()
  })
  cy //.get('[data-cy="stack-menu-list"]', {timeout: 15000} )
    .get('[data-cy="stack-menu-list-item"]', {
      timeout: 15000
    })
    .contains('Обновить таблицу')
    .should('have.css', 'opacity', '1')
    .click({
      force: true
    })
    .should('not.be.visible')
})



// поиск таблицы
Cypress.Commands.add('таблица', (testId, ...options) => {
  return cy.get(`[data-cy=stack-table]${testId ? `[description="${testId}"]` : ''}`, ...options);
});

// поиск папки
Cypress.Commands.add('папка', () => {
  return cy.get('[data-cy="foldername"]')
});

// поиск папки
Cypress.Commands.add('строкаТаблицыПапка', () => {
  return cy.get('[data-cy="foldername"]').parent()
});

// поиск строки в таблице по тексту
Cypress.Commands.add('строкаТаблицы', (str) => {
  return cy.contains('tr', str);
});

// поиск строки в таблице содержащую текст
Cypress.Commands.add('строкаТаблицыТекст', (str) => {
  return cy.get('tbody>tr').contains(str);
});

//поиск класса в строках таблицы
Cypress.Commands.add('строкаТаблицыКласс', (str) => {
  cy.get(`tr .${str}`);
});

//поиск строки в таблице
Cypress.Commands.add('поискСтроки', (ftr) => {
  cy.get('tbody>tr').eq(`${ftr}`);
});

//поиск текста в заголовке таблицы
Cypress.Commands.add('поискВЗаголовке', (th) => {
  cy.get('thead>tr').contains(`${th}`);
});

//поиск содержимого в определенной строке
Cypress.Commands.add('поискСтрокиТекст', (ftr, str) => {
  cy.get('tbody>tr').eq(`${ftr}`).contains(`${str}`);
});

//поиск по строкам и ячейкам таблиц указваем номер строки и ячейки начиная с 0
Cypress.Commands.add('поискЯчейки', (ftr, td) => {
  cy.get('tbody>tr').eq(`${ftr}`).find('>td').eq(`${td}`)
});

//поиск кнопки
Cypress.Commands.add('найтиКнопку', (text) => {
  return cy.get('button').contains(`${text}`)
});

//поиск кнопки по title 
Cypress.Commands.add('найтиКнопкуЗаголовок', (text) => {
  return cy.get(`button[title="${text}"]`)
});

Cypress.Commands.add('кнопкаОткрытьВНовойВкладке', () => {
  return cy.get('[data-cy="btn-newtab"]')
});

Cypress.Commands.add('кнопкаДобавитьПломбуИзРеестра', () => {
  return cy.get('[data-cy="btn-add-rotor"]')
})

// выделить или снять выделение (чекбокс) у строки таблицы
Cypress.Commands.add('чекбокс', () => {
  return cy.get('[data-cy=checkbox]');
});

//чекбокс с test-id
Cypress.Commands.add('чекбоксИд', (text) => {
  return cy.get(`[data-cy=checkbox][data-test-id="${text}"]`);
});

//switch
Cypress.Commands.add('свич', (text) => {
  return cy.get(`[data-cy="stack-switch"][data-test-id="${text}"]`);
});


// кнопка добавить в тулбаре таблицы
Cypress.Commands.add('кнопкаДобавить', () => {
  return cy.get('[data-cy=stack-table-toolbar] [data-cy=btn-add]');
});

// кнопка добавить в тулбаре таблицы
Cypress.Commands.add('добавить', () => {
  return cy.get('[data-cy=btn-add]');
});

Cypress.Commands.add('кнопкаДобавитьПапку', () => {
  return cy.get('[data-cy=stack-table-toolbar] [data-cy=btn-addfolder]');
});

//таблица диалог поиск не заглядывая внуть таблицы
Cypress.Commands.add('таблицаДиалогП', () => {
  return cy.get(`[data-cy=stack-select-dialog]`);
});

// кнопка удалить в строке таблицы
Cypress.Commands.add('кнопкаУдалить', () => {
  return cy.get('[data-cy=btn-delete]');
});

// кнопка редактировать в строке таблицы
Cypress.Commands.add('кнопкаРедактировать', () => {
  return cy.get('[data-cy=btn-edit]');
});

//кнопка редактировать id
Cypress.Commands.add('кнопкаРедактироватьИд', (testid) => {
  return cy.get(`[data-cy=btn-edit][data-test-id="${testid}"]`);
});

//кнопка перенести запись
Cypress.Commands.add('кнопкаПеренести', () => {
  return cy.get(`[data-cy="btn-move"]`);
});

//кнопка переход выше по иерархии
Cypress.Commands.add('кнопкаНазад', () => {
  return cy.get(`[data-cy="btn-up"]`);
});


//кнопка закрыть
Cypress.Commands.add('кнопкаЗакрыть', () => {
  return cy.get(`[data-cy=btn-close]`);
});

Cypress.Commands.add('кнопкаСохранить', () => {
  return cy.get('[data-cy=btn-save]');
});

Cypress.Commands.add('кнопкаСохранитьИд', (str) => {
  return cy.get(`[data-cy=btn-save][data-text-id="${str}"]`);
});


Cypress.Commands.add('кнопкаОтменить', () => {
  return cy.get('[data-cy=btn-cancel]');
});

//кнопка фильтр 
Cypress.Commands.add('кнопкаУстановитьФильтр', () => {
  return cy.get('[data-cy="btn-filter"][title="Установить фильтр"]');
});

Cypress.Commands.add('кнопкаСброситьФильтр', () => {
  return cy.get('[data-cy="btn-filter"][title="Сбросить фильтр"]');
});

Cypress.Commands.add('кнопкаКопировать', () => {
  return cy.get('[data-cy="btn-copy"]');
});

// кнопка поиск
Cypress.Commands.add('кнопкаПоиск', () => {
  return cy.get(`[data-cy=btn-search]`);
});

// поле быстрого поиска в тулбаре
Cypress.Commands.add('полеПоиск', () => {
  return cy.get(`[data-cy=search]`);
});

//кнопка внести
Cypress.Commands.add('кнопкаВнести', () => {
  return cy.get(`[data-cy="btn-create"]`);
});

//кнопка восстановить
Cypress.Commands.add('кнопкаВосстановить', () => {
  return cy.get(`[data-cy="btn-restore"]`);
});

//кнопка more
Cypress.Commands.add('кнопкаБольше', () => {
  return cy.get(`[data-cy="stack-table-btn-more"]`);
});

Cypress.Commands.add('btnMore', () => {
  return cy.get(`[data-cy="btn-more"]`);
});

//просуммировать записи
Cypress.Commands.add('кнопкаСумма', () => {
  return cy.get(`[data-cy="btn-calc-sum"]`);
});

//печать отчета
Cypress.Commands.add('кнопкаПечать', () => {
  return cy.get(`[data-cy="btn-print-record"]`);
});


//кнопка объединить записи
Cypress.Commands.add('кнопкаОбъединить', () => {
  return cy.get(`[data-cy="btn-merge"]`);
});

//кнопка меню
Cypress.Commands.add('кнопкаМеню', (testId) => {
  return cy.get(`[data-cy=stack-card-button][data-test-id="${testId}"]`);
});

//поиск пути к форме элемента
Cypress.Commands.add('путьКФорме', (str) => {
  return cy.get(`[d='${str}']`);
});

//радиокнопка
Cypress.Commands.add('радиоКнопка', (str) => {
  return cy.get(`[data-cy="stack-radio"][data-test-id='${str}']`);
});

//реестр событий
Cypress.Commands.add('реестрСобытий', () => {
  return cy.get(`[data-cy="msg-menu"]`);
});

Cypress.Commands.add('нетАктивныхПроцессовВРеестреСобытий', (...options) => {
  cy.get(`[data-cy="msg-menu"]`).within(() => {
    cy.get('.v-chip__content').within(() => {
      cy.get('span', ...options).should('have.length', 1)
    })
  });
});

Cypress.Commands.add('нетАктивныхПроцессовВРеестреСобытий2104', (...options) => {
  cy.get(`[data-cy="msg-menu"]`).within(() => {
    cy.get('.v-btn__content').within(() => {
      cy.get('.anim_wait_rotate', ...options).should('not.exist')
    })
  });
});

Cypress.Commands.add('естьАктивныеПроцессыВРеестреСобытий2104', (...options) => {
  cy.get(`[data-cy="msg-menu"]`).within(() => {
    cy.get('.v-btn__content').within(() => {
      cy.get('.anim_wait_rotate', ...options).should('exist')
    })
  });
});

Cypress.Commands.add('подождатьАсинхроннуюОперацию', (...options) => {
  cy.естьАктивныеПроцессыВРеестреСобытий2104(...options);
  cy.нетАктивныхПроцессовВРеестреСобытий2104(...options);
});


// кнопка История
Cypress.Commands.add('кнопкаИстория', () => {
  return cy.get('[data-cy="btn-history"]');
});

//кнопка Снять выделение
Cypress.Commands.add('кнопкаСнятьВыделение', () => {
  return cy.get('[data-cy="btn-unselectall"]');
});

//кнопка toogle
Cypress.Commands.add('tree', (...options) => {
  return cy.get('.v-treeview-node__toggle', ...options);
});

// checkbox в дереве
Cypress.Commands.add('treeCheckbox', () => {
  return cy.get('button.v-treeview-node__checkbox');
});

// корень дерева
Cypress.Commands.add('treeNodeRoot', () => {
  return cy.get('.v-treeview-node__root')
});

// узел (строка) дерева
Cypress.Commands.add('treeNode', () => {
  return cy.get('.v-treeview-node')
});

/**
 * работа с основным меню
 */
//раздел основного меню
Cypress.Commands.add('главноеМеню', (стр) => {
  return cy.get(`[date-cy="mainmenu-item"][data-test-id="${стр}"]`);
});


//найти вкладку по тексту
Cypress.Commands.add('вкладкаТекст', (text) => {
  return cy.get('[data-cy="stack-tab"]').contains(`${text}`);
});

//кнопка по содержанию
Cypress.Commands.add('кнопка', (text, ...options) => {
  return cy.get('[data-cy="stack-btn"]', ...options).contains(`${text}`);
});

//кнопки с текстом 
Cypress.Commands.add('кнопкаТекстВыбрать', () => {
  return cy.кнопка('Выбрать')
})

Cypress.Commands.add('кнопкаТекстВнести', () => {
  return cy.кнопка('Внести')
})

Cypress.Commands.add('кнопкаТекстСохранить', () => {
  return cy.кнопка('Сохранить')
})

Cypress.Commands.add('кнопкаТекстОтмена', () => {
  return cy.кнопка('Отмена')
})

Cypress.Commands.add('кнопкаТекстВнестиВБазу', () => {
  return cy.get('button').contains(' Внести в базу ')
})


//кнопка по id
Cypress.Commands.add('кнопкаИд', (str, ...options) => {
  return cy.get(`[data-cy="stack-btn"][data-test-id="${str}"]`, ...options);
});


//найти вкладку 
Cypress.Commands.add('вкладка', (str, ...options) => {
  return cy.get(`[data-cy="stack-tab"][data-test-id="${str}"]`, ...options);
});

//меню пользователя
Cypress.Commands.add('менюПользователя', () => {
  return cy.get('[data-cy="user-menu"]');
});




/**
 * Список stackMenuList
 * ! должна быть в корне а не внутри within
 */

//поиск по списку из комбобокса пишем транслитом
Cypress.Commands.add('список', (str) => {
  cy.get(`.stack-combobox-menu--${str}`);
});

//строка списка из комибобокса
Cypress.Commands.add('строкаСписка', (str) => {
  return cy.get('.v-list-item').contains(str);
});

Cypress.Commands.add('vlistitem', () => {
  return cy.get('.v-list-item');
});

//первая строка списка
Cypress.Commands.add('строкаСпискаПервая', () => {
  return cy.get('.v-list-item').first();
});

//Последня строка списка
Cypress.Commands.add('строкаСпискаПоследняя', () => {
  return cy.get('.v-list-item').last();
});

Cypress.Commands.add('строкаСпискаПоследняяБезТекста', (text) => {
  return cy.get('.v-list-item').not(`:contains("${text}")`).last();
});

//stack-list
Cypress.Commands.add('перечень', () => {
  return cy.get('[date-cy="stack-list"]');
});

//stack-list
Cypress.Commands.add('переченьИд', (stacklist) => {
  return cy.get(`[date-cy="stack-list"][data-test-id="${stacklist}"]`, {
    timeout: 20000
  });
});

//stack-list-item
Cypress.Commands.add('строкаПеречня', (stacklistitem) => {
  return cy.get(`[data-cy="stack-list-item"][data-test-it="${stacklistitem}"]`);
});

Cypress.Commands.add('строкаПеречняИд', (id) => {
  return cy.get(`[data-cy="stack-list-item"][data-test-id="${id}"]`);
});

Cypress.Commands.add('строкаПеречняСодержитТекст', (stacklistitem) => {
  return cy.get(`[data-cy="stack-list-item"]`).contains(`${stacklistitem}`);
});


//поиск stack-list-item в stack-list аргументы test-id stack-list, test-id stack-list-item
Cypress.Commands.add('строкаВПеречне', (stacklist, stacklistitem) => {
  cy.get(`[date-cy="stack-list"][data-test-id="${stacklist}"]`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.get(`[data-cy="stack-list-item"][data-test-it="${stacklistitem}"]`)
  });
})


//поиск по строке списка главного меню
Cypress.Commands.add('строкаМеню', (str) => {
  return cy.get('.menuable__content__active [data-cy="stack-menu-list"] [data-cy=stack-menu-list-item]').contains(str);
});

Cypress.Commands.add('строкаМенюПоследняя', () => {
  return cy.get('[data-cy="stack-menu-list"] [data-cy=stack-menu-list-item]').last();
});

Cypress.Commands.add('меню', (str) => {
  return cy.get('[data-cy="stack-menu-list"]').contains(str);
});

//быстрый поиск лицевого счета, нажимаем кнопку убеждаемся в наличии диалога
Cypress.Commands.add('кнопкаБыстрыйПоискЛС', () => {
  return cy.get('[data-cy="app-toolbar-chip"][data-test-id="fast-ls-search"]');
});

//быстрый ввод показаний ИПУ по лс
Cypress.Commands.add('кнопкаБыстрыйВводПоказанийИПУ', () => {
  return cy.get('[data-cy="app-toolbar-chip"][data-test-id="fast-readings-input"]');
});

//выбор списка комбобокса аргументы наименование списка из комбобокса транслитом, строка списка из комбобокса
Cypress.Commands.add('выборЭлементаСписка', (listName, stringName) => {
  cy.список(`${listName}`).should('be.visible').within(() => {
    cy.строкаСписка(`${stringName}`).click()
  });
})

Cypress.Commands.add('заполнитьКомбобокс', (comboboxId, listName, stringName) => {
  cy.полеПеречисляемое(`${comboboxId}`).last().click();
  cy.список(`${listName}`).should('be.visible').within(() => {
    cy.строкаСписка(`${stringName}`).click()
  });
});

Cypress.Commands.add('заполнитьКомбобоксВвестиТекст', (comboboxId, listName, stringName) => {
  cy.полеПеречисляемое(`${comboboxId}`).last().type(`${stringName}`);
  cy.список(`${listName}`).should('be.visible').within(() => {
    cy.строкаСписка(`${stringName}`).first().click()
  });
});

/**
 * Поля ввода
 */

Cypress.Commands.add('полеСтрока', (стр) => {
  return cy.get(`[data-cy="stack-input"][data-test-id="${стр}"]`);
});

Cypress.Commands.add('полеСтрокаБезИд', () => {
  return cy.get(`[data-cy="stack-input"]`);
});

Cypress.Commands.add('полеДатаБезИД', () => {
  return cy.get('[data-cy="stack-date-field"]');
});

Cypress.Commands.add('полеСтрокаИстория', (стр) => {
  return cy.get(`[data-cy="stack-history-input"][data-test-id="${стр}"]`);
});

Cypress.Commands.add('полеСвязи', (стр) => {
  return cy.get(`[data-cy="stack-link-field"][data-test-id="${стр}"]`);
});

Cypress.Commands.add('очиститьПолеСвязи', (testid) => {
  return cy.полеСвязи(`${testid}`).within(() => {
    cy.get('button').last().click();
  })
})

Cypress.Commands.add('очиститьПолеСвязиБезИД', () => {
  return cy.полеСвязиБезИд().within(() => {
    cy.get('button').last().click();
  })
})

Cypress.Commands.add('полеСвязиБезИд', (стр) => {
  return cy.get(`[data-cy="stack-link-field"]`);
});

Cypress.Commands.add('полеСвязиСвязь', (стр) => {
  return cy.get(`[data-cy="stack-link-field"][data-test-id="${стр}"] .v-input__prepend-inner .v-icon--link`);
});

Cypress.Commands.add('полеСвязиИнпут', (стр) => {
  return cy.get(`[data-cy="stack-link-field-input"][data-test-id="${стр}"]`);
});

Cypress.Commands.add('полеСвязиИнпутБезИд', () => {
  return cy.get(`[data-cy="stack-link-field-input"]`);
});

Cypress.Commands.add('полеДата', (стр, ...options) => {
  return cy.get(`[data-cy="stack-date-field"][data-test-id="${стр}"]`, ...options);
});

Cypress.Commands.add('полеДатаВремя', (стр, ...options) => {
  return cy.get(`[data-cy="stack-date-time-field"][data-test-id="${стр}"]`, ...options);
});

Cypress.Commands.add('полеВремя', (стр) => {
  return cy.get(`[data-cy="stack-time-field"][data-test-id="${стр}"]`);
});

Cypress.Commands.add('полеПеречисляемое', (стр) => {
  return cy.get(`[data-cy="stack-combobox"][data-test-id="${стр}"]`);
});

Cypress.Commands.add('полеПеречисляемоеБезИд', () => {
  return cy.get('[data-cy="stack-combobox"]');
});

Cypress.Commands.add('полеФлаги', (стр) => {
  return cy.get(`[data-cy="stack-flags"][data-test-id="${стр}"]`);
});

Cypress.Commands.add('полеТекст', (стр) => {
  return cy.get(`[data-cy="stack-textarea"][data-test-id="${стр}"]`);
});

Cypress.Commands.add('полеТекстБезИд', () => {
  return cy.get('[data-cy="stack-textarea"]');
});

/**
 * разное
 */

//строка в реестре событий
Cypress.Commands.add('строкаРеестраСобытий', (string) => {
  return cy.get(`[data-cy="${string}"]`);
});

// Диалог данет
// true - да, false - нет
Cypress.Commands.add('даНет', (type) => {
  return cy.get(`[data-cy=stack-yes-no] [data-cy=btn-${type ? 'yes' : 'no'}]`);
});

// алерт
Cypress.Commands.add('алерт', () => {
  return cy.get('[data-cy=stack-toast]');
});

//фильтр 
Cypress.Commands.add('фильтр', () => {
  return cy.get('[data-cy="table-filter"]');
});

//expansion panel
Cypress.Commands.add('панель', (стр) => {
  return cy.get(`[data-cy="expansion-panel"][data-test-id="${стр}"]`);
});

//expansion panel без data-test-id
Cypress.Commands.add('панельБезИд', (text) => {
  return cy.get(`[data-cy="expansion-panel"]`).contains(text);
});

//v-card
Cypress.Commands.add('карточка', (стр) => {
  return cy.get(`[data-cy="stack-card"][data-test-id="${стр}"]`);
});

//выбор рабочего месяца
Cypress.Commands.add('выборМесяца', () => {
  return cy.get('[data-cy="stack-month-chip"]');
});

//v-progress-linear__buffer
Cypress.Commands.add('progressBar', () => {
  return cy.get('.v-progress-linear__buffer');
});

//v-progress-linear__buffer
Cypress.Commands.add('progressBarTimeout', (int) => {
  return cy.get('.v-progress-linear__buffer', {
    timeout: int
  });
});

Cypress.Commands.add('подождатьЗагрузку', (int) => {
  cy.progressBarTimeout(int).should('exist');
  cy.progressBarTimeout(int).should('not.exist');
});

//v-progress-circular
Cypress.Commands.add('progressCircularBarTimeout', (int) => {
  return cy.get('.v-progress-circular', {
    timeout: int
  });
});
//окно авторизации
Cypress.Commands.add('окноАвторизации', () => {
  return cy.get('[data-cy=login]');
});

//календарь
Cypress.Commands.add('календарь', (str) => {
  return cy.get(`[data-cy="date-picker"][data-test-id="${str}"]`);
})

/**
 * Общие команды типовые действия
 */

//прикреление файла
Cypress.Commands.add('прикрепитьФайл', (filename) => {
  return cy.get('input[type=file]').attachFile(`${filename}`)
})

//перезагрузка ресурсов
Cypress.Commands.add('перезагрузитьРесурсы', (...options) => {
  cy.get('[data-cy="user-menu"]').click()
  cy.get('[data-cy="stack-menu-list"] [data-cy=stack-menu-list-item]').contains('Перезагрузить ресурсы').click()
  cy.get('[data-cy=stack-dialog][data-test-id="ПерезагрузкаРесурсов"]').within(() => {
    cy.get('[data-cy="stack-btn"]').contains('Перезагрузить').click()
  })
  cy.get('[data-cy=stack-dialog][data-test-id="ПерезагрузкаРесурсов"]', ...options).should('not.exist')
})

//закрытие диалога указывается test-id диалога
Cypress.Commands.add('закрытьДиалог', (str) => {
  cy.get(`[data-cy=stack-dialog][data-test-id="${str}"]`).within(() => {
    cy.get('[data-cy="btn-close"]').click()
  })
  cy.get(`[data-cy=stack-dialog][data-test-id="${str}"]`).should('not.exist')
})

//выбор строки из списка из списка указывается наименование списка строка списка
Cypress.Commands.add('выборЭлементаСписка', (listName, stringName) => {
  cy.список(`${listName}`).within(() => {
    cy.строкаСписка(`${stringName}`).click()
  });
})

Cypress.Commands.add('указатьСписокВыбратьПервуюСтрокуНазначитьТекстуПсевдоним', (listName, alias) => {
  return cy.список(`${listName}`).last().within(() => {
    cy.vlistitem().first().invoke('text').as(`${alias}`);
    cy.vlistitem().first().click();
  });
});

//поиск по таблице аргументы url раздела, description таблицы, текст для поиска строки, текст строки 
Cypress.Commands.add('поискВТаблице', (url, tableName, textInput, stringName) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.кнопкаПоиск().click()
    cy.полеПоиск().type(`${textInput}`)
  })
  cy.intercept(Cypress.env(`${url}`)).as('kvpl');
  cy.wait('@kvpl').its('request.body').should('not.have.property', 'error')
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.строкаТаблицы(`${stringName}`).should('be.visible')
    cy.get('tbody>tr').not(`:contains(${stringName})`).should('not.exist')
  })
})

// Выбор элементов в таблице с использованием поиска

// поиск по таблице, клик по элементу 
//tableName - название таблицы(description), textInput - название элемента
Cypress.Commands.add('поискПоТаблице', (tableName, textInput) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.кнопкаПоиск().click()
    cy.полеПоиск().type(`${textInput}`)
    cy.progressBarTimeout(60000).should('exist')
    cy.progressBarTimeout(60000).should('not.exist')
    cy.строкаТаблицы(`${textInput}`).click()
  })
})

// Поиск по таблице, выбор одного элемента в таблице, клик на кнопку Выбрать
// tableName - название таблицы(description), textInput - название элемента
Cypress.Commands.add('поискПоТаблицеВыбор1Эл', (tableName, textInput) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.кнопкаПоиск().click()
    cy.полеПоиск().type(`${textInput}`)
    cy.строкаТаблицы(`${textInput}`).within(() => {
      cy.чекбокс().click({
        force: true
      })
    })
  })
  cy.кнопкаСохранитьИд('Выбрать').last().click()
})

// Поиск по таблице, выбор двух элементов в таблице, клик на кнопку Выбрать
// tableName - название таблицы(description); textInput1, textInput1 - элементы поиска 
Cypress.Commands.add('поискПоТаблицеВыбор2Эл', (tableName, textInput1, textInput2) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.кнопкаПоиск().click()
    cy.полеПоиск().type(`${textInput1}`)
    cy.строкаТаблицы(`${textInput1}`).within(() => {
      cy.чекбокс().click({
        force: true
      })
    })
    cy.полеПоиск().clear().type(`${textInput2}`)
    cy.строкаТаблицы(`${textInput2}`).within(() => {
      cy.чекбокс().click({
        force: true
      })
    })
  })
  cy.кнопкаСохранитьИд('Выбрать').last().click()
})


// Выбор элементов в таблице без использования поиска

// Выбор двух элементов в таблице без использования поиска, клик на кнопку Выбрать
// tableName - название таблицы(description); textInput1, textInput2 - названия элементов 
Cypress.Commands.add('Выбор2СтрокВТаблице', (tableName, textInput1, textInput2) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.строкаТаблицы(`${textInput1}`).within(() => {
      cy.чекбокс().click({
        force: true
      })
    })
    cy.строкаТаблицы(`${textInput2}`).within(() => {
      cy.чекбокс().click({
        force: true
      })
    })
  })
  cy.кнопкаСохранитьИд('Выбрать').last().click()
})

// Выбор одного элемента в таблице без использования поиска
// tableName - название таблицы(description); textInput - название строки таблицы
Cypress.Commands.add('КликСтрокиВТаблице', (tableName, textInput) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.строкаТаблицы(`${textInput}`).within(() => {
      cy.чекбокс().click({
        force: true
      })
    })
  })
})

// Выбор одного элемента в таблице без использования поиска, клик на кнопку Выбрать
// tableName - название таблицы(description); textInput - название строки таблицы
Cypress.Commands.add('ВыборСтрокиВТаблице', (tableName, textInput) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
    cy.строкаТаблицы(`${textInput}`).within(() => {
      cy.чекбокс().click({
        force: true
      })
    })
  })
  cy.кнопкаСохранитьИд('Выбрать').last().click()
})

//подтверждение удаления выолняется в корне теста
Cypress.Commands.add('подтвердитьУдаление', () => {
  cy.диалог('stack-yes-no').within(() => {
    cy.кнопка('Да').click()
  })
})

Cypress.Commands.add('нажатьДа', () => {
  cy.диалог('stack-yes-no').within(() => {
    cy.кнопка('Да').click()
  });
  cy.диалог('stack-yes-no').should('not.exist');
});

//нажать кнопку нет в диалоге подтверждения удаления
Cypress.Commands.add('нажатьНет', () => {
  cy.диалог('stack-yes-no').within(() => {
    cy.кнопка('Нет').click()
  })
})

//понятно
Cypress.Commands.add('понятно', () => {
  //cy.кнопкаИд('Понятно').click().should('not.exist')  
})

//нажать нет в диалоге подтверждения действия
Cypress.Commands.add('кнопкаНет', () => {
  cy.кнопкаИд('Нет')
})

//удаление лишних записей команде ищет записи в таблице которых не должно существовать при обнаружении в таблице текста строка содержащая текст удаляется
Cypress.Commands.add('удалитьСтрокуЕслиСуществуетТекст', (tableName, trtext) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.строкаТаблицы('Запись загружается...').should('not.exist')
    cy.progressBarTimeout(60000).should('not.exist')
  });
  cy.таблица(`${tableName}`).then(($table) => {
    if ($table.text().includes(`${trtext}`)) {
      cy.строкаТаблицы(`${trtext}`).within(() => {
        cy.чекбокс().click({
          force: true
        });
      });
      cy.кнопкаУдалить().click();
      cy.подтвердитьУдаление();
    }
  })
})

//удаление всех строк в таблице с определенным текстом аргументы description таблицы, текст строки
Cypress.Commands.add('удалитьСтрокиСТекстом', (tableName, trtext) => {
  cy.таблица(`${tableName}`).within(() => {
    cy.progressBarTimeout(60000).should('not.exist')
  })
  cy.таблица(`${tableName}`).find('tr').each(($el) => {
    if ($el.text().includes(`${trtext}`)) {
      cy.таблица(`${tableName}`).within(() => {
        cy.progressBarTimeout(60000).should('not.exist')
        cy.строкаТаблицы(`${trtext}`).within(() => {
          cy.чекбокс().click({
            force: true
          });
        });
      })
      cy.кнопкаУдалить().last().click()
      cy.подтвердитьУдаление()
      cy.диалог('stack-yes-no').should('not.exist')
      cy.таблица(`${tableName}`).within(() => {
        cy.progressBarTimeout(60000).should('not.exist')
      })
    }
  })
})


//выполняем запрос  аргументы урл, токен, объект, метод, параметры
Cypress.Commands.add('sendRequest', (url, token, objectName, methodName, params) => {
  cy.request({
    method: 'post',
    url: `${url}`,
    headers: {
      'S-Access-Token': `${token}`
    },
    body: {
      tasks: [{
        objectName,
        methodName,
        params
      }]
    },
  })
})

//клика по кнопке v-treeview-node__toggle с названием папки указанным в аргументе
Cypress.Commands.add('найтиЗаписьНажатьПереключатель', (text) => {
  cy.treeNode().contains(`${text}`).parentsUntil('.v-treeview-node').within(() => {
    cy.tree().click()
  })
})

Cypress.Commands.add('inteceptInsertRequest', (url) => {
  cy.intercept(`${url}`, (req) => {
    if (req.body.tasks[0].methodName.includes('вставить')) { }
  })
})

Cypress.Commands.add('getInterceptedResult', (alias) => {
  cy.wait(`@${alias}`).then((response) => {
    return response.response.body.tasks[0].result.номерЗаписи
  })
})
