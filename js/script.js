

//Табы

document.addEventListener('DOMContentLoaded', () => {

const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');     



function hideTabContent() {         //Функция которая занимается тем, что скрывает все элементы которые в данный момент не активны
    tabsContent.forEach(item => {
        item.style.display = 'none';        //Здесь точно также можо использовать и classList   //Скрываем табы с описанием 
    }); 

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');        //Удаляем выделение активности кнопки   //Не ставим точку потому что и так работаем с классами
    });
}

function showContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');        //Здесб доп классом можно добавить например еще и анимацию
}

hideTabContent();
showContent();

// ВСЕ ЭТО ДОЛГО НЕ РАБОТАЛО ТАК КАК ПРИ ПОЛУЧЕНИИ ЭЛЕМЕНТОВ ИСПОЛЬЗОВАЛ ALL И ПОЛУЧИЛ КОЛЛЕКЦИЮ
tabsParent.addEventListener('click', (event) => {
    const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {        //Такой опрератор И чтобы мы при клики попали именно на элемент нужный а не в пустое место
            tabs.forEach((item,i) => {
                if(target == item) {        //Если выбранный элемент идентичен какому-то элементу из подходящих,то ...
                    hideTabContent();
                    showContent(i); 
                }
            });
        }
    });



// ТАЙМЕР


const deadline = '2022-08-20';

function getTimeRemaining (endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());       //Получаем сколько осталось времени до конца отсчета  //Использовали parse потому что дата была в строчном формате, а нам ее нужно получить для математического расчета
    

    //УСЛОВИЕ ЕСЛИ ВДРУГ АКЦИЯ ЗАКОНЧИТЬСЯ, МЫ ДЕЛАЕМ ЧТОБЫ ЗНАЧЕНИЯ В ТАКОМ СЛУЧАЕ БЫЛИ ПРОСТО НОЛЬ
if(t <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
} else {
    days = Math.floor(t / (1000 * 60 * 60 * 24));      // Math.floor круглет итоговые значения   //Получаем из миллисекунд количество оставшися дней
    hours = Math.floor((t / (1000 * 60 * 60 ) % 24));   //Возвращаем остаток после деления на дни
    minutes = Math.floor((t / (1000 * 60) % 60));
    seconds = Math.floor((t / 1000) % 60);
}

    return {        //Вохвразаем объект
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };

}

console.log(getTimeRemaining (deadline));

function setClock (selector, endtime) {     //Сначала получаем все элементы
    const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);      //Задаем интервал для выполнения функции

updateClock ();     //Вызываем сразу чтобы не ждать секунду до обновления на странице

function getZero(num) {         //Если меньше 10, то подставляем вперед ноль, чтобы выглядело симпатично
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
    
function updateClock () {           
    const t = getTimeRemaining(endtime);        // Получаем объект из функции

    days.innerHTML = getZero(t.days);       
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);

    if(t.total <= 0) {
        clearInterval(timeInterval);
    }
}
}

setClock ('.timer', deadline);




// Модальное окно

const modalTrigger = document.querySelectorAll('[data-modal]'),
      modalClose = document.querySelector('[data-close]'),
      modal = document.querySelector('.modal');

for(let i = 0; i < modalTrigger.length; i++) {
    modalTrigger[i].addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';        //Так запрещаем скролл при открытом модальном окне
    });
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';  
}

modalClose.addEventListener('click', () => {
    closeModal();       //Так говорим чтобы браузер сам определился какое значение ему нужно
});


// Делаем закрытие по темной области вне окна

modal.addEventListener('click', (event) => {
    if(event.target == modal) {
        closeModal(); 
    }
});


// Делаем чтобы окно закрывалось при нажатии кнопки esc

document.addEventListener('keydown', (e) => {
if(e.code == 'Escape' && modal.classList.contains('show')) {
    closeModal();
}
});


});









