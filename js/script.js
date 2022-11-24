

// Собираем документ по модулям для разделения функционала и чтобы лучше ориентироваться в коде

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