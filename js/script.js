

// Собираем документ по модулям для разделения функционала и чтобы лучше ориентироваться в коде
// Можно модули брать полностью и переиспользовать в других проектах

document.addEventListener('DOMContentLoaded', () => {
    
    const tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        calc = require('./modules/calc'),
        forms = require('./modules/forms'),
        cards = require('./modules/cards'),
        modal = require('./modules/modal'),
        sliders = require('./modules/sliders');

        tabs();
        timer();
        calc();
        forms();
        cards();
        modal();
        sliders();

});