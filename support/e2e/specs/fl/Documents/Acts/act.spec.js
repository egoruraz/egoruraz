import * as Table from '/tests/e2e/support/PageModules/stack-table';
import * as Act from '/tests/e2e/support/PageModules/FL/Documents/act.js';
import * as Button from '/tests/e2e/support/PageModules/modal_dialog_buttons.js';
import {
  requestDelete
} from '/tests/e2e/support/requestDeleteFl.js';
import {
  getCurrDate,
  getOpenMonth,
  getClosedMonth,
  findStringByFieldReturnValueOfSecondFiled,
  checkValueInArray
} from '/tests/e2e/support/functions.js';
import {
  subMonthFromCurrentDate
} from '/tests/e2e/support/dateUtils.js';
import {
  format,
  lastDayOfMonth
} from 'date-fns';
import {
  getAccountCalculation,
  getAccountId,
  calculateAccount
} from '/tests/e2e/support/requestsAccountsFl.js';

describe('Акты снятия качества работа с диалогом и функционал', function () {

  const today = `${getCurrDate()}`;
  const warning = 'Необходимо внести температуру';

  before(function () {
    cy.getToken();
    cy.visit(`${Cypress.env('url')}/fl/documents/qualityacts/new`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('common', `{"token":"${Cypress.env('token')}"}`)
      },
    });
    cy.log('Заполняем обязательные поля и вносим документ');
    Act.диалог().within(() => {
      cy.progressBarTimeout(10000).should('not.exist');
      Act.ВидУхудшенияКачества().click();
    });
    cy.fixture("table_descriptions").then(function (table) {
      this.table = table;
      Table.таблица(this.table.ВидыСниженияОплаты).within(() => {
        cy.progressBar().should('not.exist');
        Table.строкаТаблицыТекст('ХВС').click();
        cy.progressBar().should('not.exist');
        Table.строкаТаблицыТекст('Отсутствие').click();
      });
      Table.таблица(this.table.ВидыСниженияОплаты).should('not.exist');
    });
    cy.inteceptInsertRequest(Cypress.env('kvplfl')).as('insert');
    Button.Внести().click();
    cy.getInterceptedResult('insert').as('idАкта');
    Button.Внести().should('not.exist');
  });

  beforeEach(function () {
    cy.setLocalStorage('common', `{"token":"${Cypress.env('token')}"}`);
    cy.viewport(1920, 1280);
    cy.fixture("table_descriptions").then(function (table) {
      this.table = table;
    });
    Act.диалог().within(() => {
      cy.progressBarTimeout(10000).should('not.exist');
    });
  });

  after(function () {
    cy.fixture('objectName').then(function (object) {
      this.object = object;
      requestDelete(Cypress.env('kvplfl'), this.object.АктыСнятияКачества, this.idАкта);
    });
  });

  it('Новый диалог акта снятия качества чек лист', function () {
    const открытыйМесяц = `${getOpenMonth('ММ.ГГГГ')}`;
    cy.log('1. Поле Номер заполнено и доступно для ввода');
    Act.Номер().should('not.have.value', '').and('be.enabled');
    cy.log('2. Поле Дата заполнено текущей датой и доступно для ввода');
    Act.Дата().should('have.value', today).and('be.enabled');
    cy.log('3. Поле расчетный месяц заполнено открытым месяцем и доступно для ввода');
    Act.РасчетныйМесяц().should('have.value', открытыйМесяц).and('be.enabled');
    cy.log('4. Поле услуга заполнено номером услуги из таблицы вид ухудшения качества')
    Act.Услуга().invoke('val').then(value => {
      expect(value).to.contain('ХВС');
    });
  });

  it('Список адресов фильтр подъезд', function () {
    const ул = 'ул. Виноградная';
    const дом = '1';
    const адрес = 'г Радужный, Кировский р-н, ул. Виноградная, д.1';
    cy.log('1. Нажать добавить в тулбаре таблицы список адресов');
    Table.кнопкаДобавить().last().click();
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
    });
    cy.log(`2. Заполнить поле лицевой счет значением ${адрес}`);
    Act.заполнитьПолеПоЛицевомуСчету(ул, дом, адрес);
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
      cy.log('3. Включить свич Подъезды');
      Act.Подъезды().check({
        force: true
      });
      cy.log('4. Заполнить поля от до значением "2"');
      Act.ПодъездС().clear().type('2');
      Act.ПодъездПо().clear().type('2');
      cy.log('5. Нажать внести');
      Button.кнопкаВнести().click();
    });
    Act.диалогЛицевые().should('not.exist');
    cy.log('Результат: в таблице отображается только строка с кв.2');
    Table.строкаТаблицыТекст('кв.2');
    Table.проверитьКоличествоСтрок(1);
    Table.удалитьВсеЗаписиВТаблице('');
  });

  it('Список адресов фильтр этаж', function () {
    const ул = 'ул. Брусничная';
    const дом = '1';
    const адрес = 'г Радужный, Дзержинский р-н, ул. Брусничная, д.1';
    cy.log('1. Нажать добавить в тулбаре таблицы список адресов');
    Table.кнопкаДобавить().last().click();
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
    });
    cy.log(`2. Заполнить поле лицевой счет значением ${адрес}`);
    Act.заполнитьПолеПоЛицевомуСчету(ул, дом, адрес);
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
      cy.log('3. Включить свич Этажи');
      Act.Этажи().check({
        force: true
      });
      cy.log('4. Заполнить поля от до значением "2"');
      Act.ЭтажС().clear().type('2');
      Act.ЭтажПо().clear().type('2');
      cy.log('5. Нажать внести');
      Button.кнопкаВнести().click();
    });
    Act.диалогЛицевые().should('not.exist');
    cy.log('Результат: в таблице отображается только строка с кв.2');
    Table.строкаТаблицыТекст('кв.2');
    Table.проверитьКоличествоСтрок(1);
    Table.удалитьВсеЗаписиВТаблице('');
  });

  it('Список адресов отбор по УК', function () {
    const ул = 'ул. Питерская';
    const дом = '0';
    const адрес = 'г Любим, ул. Питерская';
    const УК = 'Управляющая компания №1';
    cy.log('1. Нажать добавить в тулбаре таблицы список адресов');
    Table.кнопкаДобавить().last().click();
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
    });
    cy.log(`2. Заполнить поле лицевой счет значением ${адрес}`);
    Act.заполнитьПолеПоЛицевомуСчету(ул, дом, адрес);
    cy.log(`3. Заполнить поле Управлияющая компания значением ${УК}`);
    Act.УправляющаяКомпания().click();
    Table.поискВТаблице('kvplfl', this.table.Организации, УК, УК);
    Table.таблица(this.table.Организации).within(() => {
      Table.строкаТаблицыТекст(УК).click();
    });
    Table.таблица(this.table.Организации).should('not.exist');
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
      cy.log('4. Нажать внести');
      Button.кнопкаВнести().click();
    });
    Act.диалогЛицевые().should('not.exist');
    cy.log('Результат: в таблице отображается только строка с д.1');
    Table.строкаТаблицыТекст('д.1');
    Table.проверитьКоличествоСтрок(1);
    Table.удалитьВсеЗаписиВТаблице('');
  });

  it('Список адресов фильтр по поставщику', function () {
    const ул = 'ул. Электрическая';
    const дом = '0';
    const адрес = 'д Афанасьево, ул. Электрическая';
    const поставщик = 'ООО "Водоканал"';
    cy.log('1. Нажать добавить в тулбаре таблицы список адресов');
    Table.кнопкаДобавить().last().click();
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
    });
    cy.log(`2. Заполнить поле лицевой счет значением ${адрес}`);
    Act.заполнитьПолеПоЛицевомуСчету(ул, дом, адрес);
    cy.log(`3. Заполнить поле поставщик значением ${поставщик}`);
    Act.Поставщик().click();
    Table.поискВТаблице('kvplfl', this.table.Организации, поставщик, поставщик);
    Table.таблица(this.table.Организации).within(() => {
      Table.строкаТаблицыТекст(поставщик).click();
    });
    Table.таблица(this.table.Организации).should('not.exist');
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
      cy.log('4. Нажать внести');
      Button.кнопкаВнести().click();
    });
    Act.диалогЛицевые().should('not.exist');
    cy.log('Результат: в таблице отображается только строка с д.1');
    Table.строкаТаблицыТекст('д.1');
    Table.проверитьКоличествоСтрок(1);
    Table.удалитьВсеЗаписиВТаблице('');
  });

  it('Диалог отбора адресов поля дата должны быть в одном месяце', function () {
    const предыдущийМесяц = `${subMonthFromCurrentDate(1,'dd.MM.yyyy')}`;
    const месяцПередПредыдущим = `${subMonthFromCurrentDate(2,'dd.MM.yyyy')}`;
    const warning = 'Даты должны быть в одном месяце!';
    cy.log('1. Нажать добавить в тулбаре таблицы список адресов');
    Table.кнопкаДобавить().last().click();
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
      cy.log(`2. Заполнить поле дата с значением ${месяцПередПредыдущим}`);
      Act.датаС().clear().type(месяцПередПредыдущим);
      cy.log(`3. Заполнить поле дата по значением ${предыдущийМесяц}`);
      Act.датаПо().clear().type(предыдущийМесяц);
      //клик для перерисовки фронта
      Act.датаС().click();
      cy.log(`Результат: наличие предупреждения ${warning}`);
      cy.contains(warning);
      cy.log('Результат: кнопка внести недоступна');
      Button.кнопкаВнести().parent().should('be.disabled');
      Button.кнопкаОтмена().click();
    });
    Act.диалогЛицевые().should('not.exist');
  });

  it('Изменение периода у одного объекта изменяет период у всех объектов', function () {
    const первоеЧисло = `01.${getClosedMonth('ММ.ГГГГ')}`;
    const второеЧисло = `02.${getClosedMonth('ММ.ГГГГ')}`;
    const третьеЧисло = `03.${getClosedMonth('ММ.ГГГГ')}`;
    const ул = 'ул. Виноградная';
    const дом = '0';
    const адрес = 'г Радужный, Кировский р-н, ул. Виноградная';
    cy.log('1. Нажать добавить в тулбаре таблицы список адресов');
    Table.кнопкаДобавить().last().click();
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
    });
    cy.log(`2. Заполнить поле лицевой счет значением ${адрес}`);
    Act.заполнитьПолеПоЛицевомуСчету(ул, дом, адрес);
    Act.диалогЛицевые().within(() => {
      cy.log(`3. Заполнить поле дата с значением ${первоеЧисло}`);
      Act.датаС().clear().type(первоеЧисло);
      cy.log(`4. Заполнить поле дата по значением ${второеЧисло}`);
      Act.датаПо().clear().type(второеЧисло);
      cy.progressBar().should('not.exist');
      cy.log('5. Нажать внести');
      Button.кнопкаВнести().click();
    });
    Act.диалогЛицевые().should('not.exist');
    cy.log(`6. Кликнуть по записи в таблице ${адрес}`);
    Table.таблица('').within(() => {
      cy.progressBar().should('not.exist');
      Table.строкаТаблицыТекст(ул).click();
    });
    Act.диалогЛицевые().within(() => {
      cy.log(`7. Заполнить поле дата по значением ${третьеЧисло}`);
      Act.датаПо().clear().type(третьеЧисло);
      //клик для перерисовки фронта
      Act.датаС().click();
      cy.log('8. Нажать Сохранить');
      Button.кнопкаСохранить().click();
    });
    Act.диалогЛицевые().should('not.exist');
    cy.progressBar().should('not.exist');
    cy.log(`Результат: все строки в таблице содержат текст ${третьеЧисло}`);
    Table.получитьВсеСтрокиПроверитьНаличиеТекста('', третьеЧисло);
    Table.удалитьВсеЗаписиВТаблице('');
  });

  it('Внесение Акта качества ГВС: отклонение температуры возможно только при указании снижения температуры', function () {
    const видУхудшения = 'ГВС: отклонение температуры';
    cy.log(`1. Выбрать вид ухудщения качества ${видУхудшения}`);
    Act.очиститьВидУхудшенияКачества();
    Act.ВидУхудшенияКачества().click();
    Table.поискВТаблице('kvplfl', this.table.ВидыСниженияОплаты, видУхудшения, видУхудшения);
    Table.таблица(this.table.ВидыСниженияОплаты).within(() => {
      Table.строкаТаблицыТекст(видУхудшения).click();
    });
    Table.таблица(this.table.ВидыСниженияОплаты).should('not.exist');
    cy.log('2. Нажать кнопку внести');
    Button.ВнестиСохранить('АктыСнятияКачества').click();
    cy.log(`3. Появляется warning ${warning}`);
    cy.contains(warning);
    cy.log('4. Перейти на вкладку "Расчет коэффициента"');
    Act.вкладкаРасчетКоэффициента().click();
    cy.log('5. Заполнить поле Нормативная температура числовым значением');
    Act.НормативнаяТемпература().clear().type('1');
    Button.ВнестиСохранить('АктыСнятияКачества').click().should('be.disabled');
  });

});

describe('Расчет актов', function () {

  beforeEach(function () {
    cy.viewport(1920, 1280);
    cy.getToken();
    cy.visit(`${Cypress.env('url')}/fl/documents/qualityacts/new`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('common', `{"token":"${Cypress.env('token')}"}`)
      },
    });
    cy.fixture("table_descriptions").then(function (table) {
      this.table = table;
    });
    Act.диалог().within(() => {
      cy.progressBarTimeout(10000).should('not.exist');
    });
  });

  after(function () {
    cy.fixture('objectName').then(function (object) {
      this.object = object;
      requestDelete(Cypress.env('kvplfl'), this.object.АктыСнятияКачества, this.idАктаРучнойВвод);
      requestDelete(Cypress.env('kvplfl'), this.object.АктыСнятияКачества, this.idАктаБезШтрафа);
    });
  });

  it('Проверка расчета при ручном вводе коэффициента (при неуказанном виде снижения) в закрытом периоде', function () {
    const группаУслуг = '600 - Горячее водоснабжение';
    const группаЗапрос = 600;
    const номерЛс = '70';
    const датаВвода = (строка) => {
      const chars = строка.split('');
      const год = (chars[3] + chars[4] + chars[5] + chars[6]);
      const месяц = (chars[0] + chars[1]);
      return `${год} ${месяц}`;
    }
    const закрытыйMесяц = `${getClosedMonth('ММ.ГГГГ')}`;
    const последнийДеньЗакрытогоМесяца = `${format(lastDayOfMonth(new Date(датаВвода(закрытыйMесяц))),'dd.MM.yyyy')}`;
    const месяцРасчета = `${getOpenMonth('api')}`;
    cy.log(`2. Заполнить поле услуга группой ${группаУслуг}`);
    Act.Услуга().click();
    Table.таблица(this.table.Услуги).within(() => {
      cy.progressBar().should('not.exist');
      Table.отметитьСтроку(группаУслуг);
    });
    Table.таблица(this.table.Услуги).should('not.exist');
    cy.перехватЗапросаВставить(Cypress.env('kvplfl')).as('вставить');
    cy.log('3. Нажать "Внести"');
    Button.Внести().click();
    cy.возвратНомераЗаписи('вставить').as('idАктаРучнойВвод');
    Button.Внести().should('not.exist');
    cy.подождатьЗагрузку(10000);
    Table.кнопкаДобавить().last().click();
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
      cy.log('4. Заполнить поле дата с первым числом закрытого месяца');
      Act.датаС().clear().type(`01.${закрытыйMесяц}`);
      cy.log('5. Заполнить поле дата по последним числом закрытого месяца');
      Act.датаПо().clear().type(последнийДеньЗакрытогоМесяца);
      cy.log('6. Заполнить поле по лицевому счету значением "70"');
      Act.ПоЛицевомуСчету().type(`${номерЛс}{enter}`);
      cy.log('7. Нажать кнопку "Внести" в диалоге выбора адресов');
      Button.кнопкаВнести().click();
    });
    Act.диалогЛицевые().should('not.exist');
    cy.log('8. Перейти на вкладку расчет коэффициента');
    Act.вкладкаРасчетКоэффициента().click();
    cy.log('9. Заполнить поле Рассчитанный коэффициент значением 1');
    Act.РассчитанныйКоэффициент().clear().type('1');
    //клик для перерисовки фронта
    Act.НормативнаяТемпература().click();
    cy.log('10. Нажать "Сохранить"');
    Button.Сохранить().click();
    Button.Сохранить().should('be.disabled');
    cy.log('11. Нажать кнопку "Рассчитать"');
    Act.кнопкаРассчитать().click();
    cy.log('12. Дождаться выполнения асинхронной операции');
    cy.подождатьАсинхроннуюОперацию();
    cy.log('Результат сумма снятие по качеству в расчете лицевого равна отрицательной ')
    getAccountId(Cypress.env('kvplfl'), номерЛс, 'idЛс70')
      .then(idЛс => {
        getAccountCalculation(Cypress.env('kvplfl'), idЛс, `${getClosedMonth('api')}`)
          .then(response => {
            let начисления = findStringByFieldReturnValueOfSecondFiled(response, 'номеру', группаЗапрос, 'начислено');
            return начисления
          }).as('начисления');
        cy.get('@начисления').then(начисления => {
          getAccountCalculation(Cypress.env('kvplfl'), idЛс, месяцРасчета)
            .then(response => {
              let качество = findStringByFieldReturnValueOfSecondFiled(response, 'номеру', группаЗапрос, 'качество');
              expect(начисления).to.be.eq(-качество);
            });
        });
      });
  });

  it('Проверка начисления ХВС: при превышении допустимого перерыва подачи (тип=0) максимальное количество часов по одному акту без штрафа', function () {
    const видУхудшения = 'ХВС: при превышении допустимого перерыва подачи';
    const номерЛс = '62';
    const месяцРасчета = `${getOpenMonth('ММ.ГГГГ')}`;
    cy.log(`1. Заполнгить поле вид ухудшения качества значением ${видУхудшения}`);
    Act.ВидУхудшенияКачества().click();
    Table.поискВТаблице('kvplfl', this.table.ВидыСниженияОплаты, видУхудшения, видУхудшения);
    Table.таблица(this.table.ВидыСниженияОплаты).within(() => {
      Table.строкаТаблицыТекст(видУхудшения).click();
    });
    Table.таблица(this.table.ВидыСниженияОплаты).should('not.exist');
    cy.перехватЗапросаВставить(Cypress.env('kvplfl')).as('вставить');
    cy.log('2. Нажать "Внести"');
    Button.Внести().click();
    cy.возвратНомераЗаписи('вставить').as('idАктаБезШтрафа');
    Button.Внести().should('not.exist');
    cy.подождатьЗагрузку(10000);
    cy.log('3. Нажать добавить в тулбаре таблицы список адресов');
    Table.кнопкаДобавить().last().click();
    Act.диалогЛицевые().within(() => {
      cy.progressBar().should('not.exist');
      cy.log('4. Заполнить поле дата с первым числом закрытого месяца');
      Act.ВремяС().clear().type('00:00');
      cy.log('5. Заполнить поле дата по последним числом закрытого месяца');
      Act.ВремяПо().clear().type('04:00');
      cy.log('4. Заполнить поле дата с первым числом закрытого месяца');
      Act.датаС().clear().type(`01.${месяцРасчета}`);
      cy.log('5. Заполнить поле дата по последним числом закрытого месяца');
      Act.датаПо().clear().type(`01.${месяцРасчета}`);
      cy.log(`6. Заполнить поле по лицевому счету значением ${номерЛс}`);
      Act.ПоЛицевомуСчету().type(`${номерЛс}{enter}`);
      cy.log('7. Нажать кнопку "Внести" в диалоге выбора адресов');
      Button.кнопкаВнести().click();
    });
    Act.диалогЛицевые().should('not.exist');
    cy.progressBar().should('not.exist');
    getAccountId(Cypress.env('kvplfl'), номерЛс, 'idЛс62')
      .then(idЛс => {
        calculateAccount(Cypress.env('kvplfl'), idЛс);
        getAccountCalculation(Cypress.env('kvplfl'), idЛс, месяцРасчета)
          .then(response => {
            let arr = Array.from(response.body.tasks[0].result.записи);
            checkValueInArray(arr, 'Штраф', 'false');
          });
      });
  });

})
