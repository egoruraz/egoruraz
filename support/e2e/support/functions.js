import {
  setDateSubMonth,
  currentDate,
  formatDate
} from '/tests/e2e/support/dateUtils.js';

//поиск значения в массиве аргументы массив, значение, возвращаемое булево возвращает true или false
export function checkValueInArray(arr, val, bool) {
  const inArray = (arr, val) => arr.flat(Infinity).includes(val);
  let checkarr = inArray(arr, val);
  switch (bool) {
    case 'true':
      return expect(checkarr).to.be.true;
    case 'false':
      return expect(checkarr).to.be.false;
  }
}

// получаем дату в формате дд.мм.гггг
export function getCurrDate() {
  return currentDate('dd.MM.yyyy');
}

export function getClosedMonth(format) {
  //глобальная переменная для получения открытого месяца
  let chars = Array.from(`${Cypress.env('openMonth')}`);
  let year = (chars[0] + chars[1] + chars[2] + chars[3]);
  let month = (chars[5] + chars[6]);
  switch (format) {
    case 'ММ.ГГГГ':
      return (`${setDateSubMonth(year, month, 1, 'MM.yyyy')}`);
    case 'ДД.ММ.ГГГГ':
      return (`${setDateSubMonth(year, month, 1, 'dd.MM.yyyy')}`);
    case 'ГГГГ-ММ-ДД':
      return (`${setDateSubMonth(year, month, 1, 'yyyy-MM-dd')}`);
    case 'api':
      return (`${setDateSubMonth(year, month, 1, 'yyyy-MM')}-01T00:00:00`);
  }
}

export function getOpenMonth(format) {
  //глобальная переменная для получения открытого месяца
  let chars = Array.from(`${Cypress.env('openMonth')}`);
  let year = (chars[0] + chars[1] + chars[2] + chars[3]);
  let month = (chars[5] + chars[6]);
  switch (format) {
    case 'ММ.ГГГГ':
      return (`${formatDate(year, month, 'MM.yyyy')}`);
    case 'ДД.ММ.ГГГГ':
      return (`${formatDate(year, month, 'dd.MM.yyyy')}`);
    case 'ГГГГ-ММ-ДД':
      return (`${formatDate(year, month, 'yyyy-MM-dd')}`);
    case 'api':
      return (`${formatDate(year, month, 'yyyy-MM')}-01T00:00:00`);
  }
}

//функция аргуманты ввода ответ запроса, наименование поля значение которого знаем, значение поля, наименование поля значение котрого надо вернуть
//получаем индекс поля значение котрого известно
//получаем индекс поля значение котрого надо узнать
//ищем в записях индекс строки содержащую значение поля которое известно
//возвращаем значение которое надо найти 
export function findStringByFieldReturnValueOfSecondFiled(response, field, fildValue, fieldValueToReturn) {
  let findarr = Array.from(response.body.tasks[0].result.поля);
  let findFirstIndex = findarr.indexOf(`${field}`);
  let findSecondIndex = findarr.indexOf(`${fieldValueToReturn}`);
  let arr = Array.from(response.body.tasks[0].result.записи);
  function find(arr, index, value) {
    for (let i = 0; i < arr.length; i++)
      if (arr[i][index] == value)
        return i;
  }
  let stringIndex = find(arr, findFirstIndex, fildValue);
  let valueToReturn = response.body.tasks[0].result.записи[stringIndex][findSecondIndex];
  return valueToReturn;
}

//генератор случайной строки
export function randomString() {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let string = '';
  for (let i = 0; i < 15; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return (string);
}

//генератор случайной строки определенной длины
export function randomStringSetLength(length) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  for (let i = 0; i < length; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return (string);
}

//рандомное число в диапазоне 
export function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//функция возвращает значение искомого поля в массиве аргументы response ответа запроса, искомое поле 
//вызывать функцию в then после выполнения запроса
export function findFieldReturnValue(response, field) {
  let findarr = Array.from(response.body.tasks[0].result.поля)
  let findInd = findarr.indexOf(`${field}`)
  let arr = Array.from(response.body.tasks[0].result.записи[0])
  let value = arr[findInd]
  return value
}

//функция ищет индекс поля по массиву response.body.tasks[0].result.поля 
//создает массив всех значений по найденному полю фильтрует пустые значения
//возвращает значение 0 элемента массива
export function findFieldReturnFirstValueNotEqNull(response, field) {
  let findarr = Array.from(response.body.tasks[0].result.поля)
  let findInd = findarr.indexOf(`${field}`)
  let arr = Array.from(response.body.tasks[0].result.записи)
  let col = arr.map(function (value) {
    return value[findInd]
  })
  let result = col.filter(function (value) {
    return value.length > 0
  })
  return result[0]
}

