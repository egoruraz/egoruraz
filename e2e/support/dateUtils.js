import {
  addDays,
  addMonths,  
  addYears,
  format, 
  lastDayOfMonth,
  subMonths, 
  sub
} from 'date-fns';

export function subMonthFromCurrentDate(amount, formatDate) {
  const val = new Date();
  return format(subMonths(val, amount), `${formatDate}`);
}

export function subDay(amount, formatDate) {
    const val = new Date();
    return format(sub(val, { days: amount}), `${formatDate}`);
}

export function currentDate(formatDate) {
    const val = new Date();
    return format(val,`${formatDate}`); 
}

export function formatDate(year, month, formatDate) {
    const val = new Date(`${year}-${month}-01`);
    return format(val,`${formatDate}`); 
}

export function firstDayOfCurrMonth(formatDate) {
    const val = new Date();
    val.setDate(1);
    return format(val,`${formatDate}`); 
}

export function addDaysToDate(amount, formatDate) {
    const val = new Date();
    return format(addDays(val, amount), `${formatDate}`);
}

export function addMonthToDate(amount, formatDate) {
    const val = new Date();
    return format(addMonths(val, amount), `${formatDate}`);
}

export function getLastDayOfMonth(formatDate) {
    const val = new Date();
    return format(lastDayOfMonth(val), `${formatDate}`);
}

export function addDaysAndMonthToDate(amountDays, amountMonth, formatDate) {
    const val = new Date();
    const nextDay = addDays(val, amountDays);
    return format(addMonths(nextDay, amountMonth), `${formatDate}`);
}

export function addMonthGetLastDay(amount, formatDate) {
    const val = new Date();
    const nextDay = addMonths(val, amount);
    return format(lastDayOfMonth(nextDay), `${formatDate}`);
}

export function addMonthSetFirstDay(amount, formatDate) {
    const val = new Date();
    const nextDay = addMonths(val, amount);
    nextDay.setDate(1);
    return format(nextDay,`${formatDate}`); 
}

export function setDateAddMonth(date, amount, formatDate) {
    const val = new Date(`${date}`);
    return format(addMonths(val, amount), `${formatDate}`);
}

export function setDateSubMonth(year, month, amountToSub, formatDate) {
    const val = new Date(`${year}-${month}-01`);
    return format(subMonths(val, amountToSub), `${formatDate}`);
}

export function setDateSubMonthGetLastDayOfMonth(year, month, amountToSub, formatDate) {
    const val = new Date(`${year}-${month}-01`);
    const prevMonth = subMonths(val, amountToSub);
    return format(lastDayOfMonth(prevMonth), `${formatDate}`);
}   

export function subMonthFromDateGetLastDayOfMonth(amountToSub, formatDate) {
    const val = new Date();
    const prevMonth = subMonths(val, amountToSub);
    return format(lastDayOfMonth(prevMonth), `${formatDate}`);
}

export function addYearsToCurrDate(amount, formatDate) {
    const val = new Date();
    return format(addYears(val,amount), formatDate);
}

export function addMonthAndDaysToDate(amountDays, amountMonth, formatDate) {
    const val = new Date();
    const nextDay = addMonths(val, amountMonth);
    return format(addDays(nextDay, amountDays), `${formatDate}`);
}