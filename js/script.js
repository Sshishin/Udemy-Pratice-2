

// Собираем документ по модулям для разделения функционала и чтобы лучше ориентироваться в коде
// Можно модули брать полностью и переиспользовать в других проектах
//Нет привязки к конкрентым переменным, привязка только к аргументов при вызове
// Деструктуризация позволяет не следить за порядком аргументов и становитья более очевидно редназначение каждого из них

    import tabs from'./modules/tabs';
    import timer from'./modules/timer';
    import calc from'./modules/calc';
    import forms from'./modules/forms';
    import cards from'./modules/cards';
    import modal from'./modules/modal';
    import sliders from'./modules/sliders';
    import {showModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    
    // Добавляем вызов окна через какое-то время
    
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 5000);
    
    //Передаем эти аргументы к модулям, а в инициации функций в модулях прописываем переменные
        tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
        timer('.timer', '2023-10-10');
        calc();
        forms('form', modalTimerId);
        cards();
        modal('[data-modal]','.modal', modalTimerId);
        sliders({
            container: '.offer__slider',
            nextArrow: '.offer__slider-next',
            slide: '.offer__slide',
            previousArrow: '.offer__slider-prev',
            currentCounter: 'current',
            wrapper: '.offer__slider-wrapper',
            inner: '.offer__slider-inner',
        });

});