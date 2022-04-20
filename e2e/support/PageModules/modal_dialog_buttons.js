export function кнопкаВнести() {
    return cy.кнопкаТекстВнести()
}

export function кнопкаСохранить() {
    return cy.кнопкаТекстСохранить()
}

export function кнопкаОтмена() {
    return cy.кнопкаТекстОтмена()
}

export function кнопкаЗакрыть() {
    return cy.кнопкаЗакрыть()
}

export function кнопкаВыбрать() {
    return cy.кнопкаТекстВыбрать()
}

export function кнопкаВнестиВБазу() {
    return cy.кнопкаТекстВнестиВБазу()
}

export function Сохранить() {
    return cy.кнопкаСохранить()
}

export function кнопкаДа() { 
    return cy.кнопкаИд('Да')
}

export function Внести() { 
    return cy.кнопкаВнести()
}

export function Да() { 
    return cy.кнопкаИд('Да')
}

export function Нет() { 
    return cy.кнопкаИд('Нет')
}

export function Печать() {
    return cy.кнопка('Печать')
}

export function кнопкаДалее() {
    return cy.кнопка('Далее')
}

export function Восстановить() {
    return cy.кнопкаВосстановить()
}

export function Загрузить() {
    return cy.get('button').contains('Загрузить').parent()
}

export function ВнестиСохранить(диалог) {
    return cy.диалог(`${диалог}`).get('[data-cy="toolbar"]').find('button').eq(-1);
}

export function кнопкаОк() {
    return cy.кнопка('ОК')
}

export function Продолжить() {
    return cy.кнопка('Продолжить')
}