

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
    const t = Date.parse(endtime) - Date.parse(new Date());       //Получаем сколько осталось времени до конца отсчета  //Использовали parse потому что дата была в строчном формате, а нам ее нужно получить для математического расчета в миллисекундах
    

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
    //   modalClose = document.querySelector('[data-close]');  //Рефактор
      modal = document.querySelector('.modal');      

for(let i = 0; i < modalTrigger.length; i++) {
    modalTrigger[i].addEventListener('click', () => {
        showModal();      
    });
}

function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //Так запрещаем скролл при открытом модальном окне
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';  
    clearInterval(modalTimerId);       //Если пользователь уже открыл окно, то убираем вызов через время
}

// modalClose.addEventListener('click', () => {
//     closeModal();       //Так говорим чтобы браузер сам определился какое значение ему нужно
// });  Рефактор


// Делаем закрытие по темной области вне окна

modal.addEventListener('click', (event) => {
    if(event.target == modal || event.target.getAttribute('data-close') == '') {       //После рефактора
        closeModal(); 
    }
});


// Делаем чтобы окно закрывалось при нажатии кнопки esc

document.addEventListener('keydown', (e) => {
if(e.code == 'Escape' && modal.classList.contains('show')) {
    closeModal();
}
});

// Добавляем вызов окна через какое-то время

const modalTimerId = setTimeout(showModal, 50000);

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {       // Если пролистанная часть страницы + видимая часть страницы >= всей страницы то...
        showModal();
        window.removeEventListener('scroll',showModalByScroll);     //Делаем так чтобы при долистывании до конца страницы, окно появлялось только один раз
    }
}

window.addEventListener('scroll',showModalByScroll);


// Классы ES6
    
class MenuCard {
    constructor(src, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
    }

    render() {
        const element = document.createElement('div');
        this.classes.forEach(className => element.classList.add(className));
        element.innerHTML = `
                    <img src=${this.src} alt="vegy">
                    <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
        `;
        this.parent.append(element);
    }

}

const div = new MenuCard(
    "img/tabs/vegy.jpg",
    '"Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    299,
    '.menu .container',
    'menu__item'

);

const premium = new MenuCard(
    "img/tabs/elite.jpg",
    '"Премиум"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container',
    'menu__item'

);

const post = new MenuCard(
    "img/tabs/post.jpg",
    '"Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container',
    'menu__item'

);

div.render();
premium.render();
post.render();


// Forms

const forms = document.querySelectorAll('form');    //Получаем все формы

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Все прошло успешно',
    failure: 'Произошла ошибка!'
};

forms.forEach(item => {     //Присваиваем обработчик для каждой формы
    postData(item);
});

function postData(form) {       //Функция постинга
    form.addEventListener('submit', (e) => {
        e.preventDefault();     //Отменяем стандартное поведение браузера когда он перезажружается после отправки формы

        const statusMessage = document.createElement('img');   //Создаем окно отображения состояния запроса
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;   //Сразу после отправки запроса высвечивается загрузка
        // form.append(statusMessage);     //Помещаем созданный блок с состоянием в самый конец формы
        form.insertAdjacentElement('afterend', statusMessage);     //Усовершенствованный вариант чтобы спиннер показывался после блока и в каждой форме одинаково
    
        const request = new XMLHttpRequest();
        request.open('POST','server.php');

        // request.setRequestHeader('Content-type', 'multipart/form-data');     //В комбинации XML и FormData заголовок не используется и ставиться автоматически
        // request.setRequestHeader('Content-type', 'application/json');       //Для отправки в json формате
        // formData - это один из форматов обмена данными с сервером как и json и такой формат сам формирует данные из форм
        const formData = new FormData(form);

        request.send(formData);

        // ****** Преобразование formdata к json формату

        // const object = {}
        // formData.forEach((value, key) => {
        //     object[key] = value;
        // });
        // const json = JSON.stringify(object);
        // request.send(json);

        // ******

        request.addEventListener('load', () => {
            if(request.status === 200) {
                console.log(request.response);
                showThanksModal(message.success);
                // statusMessage.textContent = message.success;     //ПР
                form.reset();   //Очищается после отправки
                // setTimeout(() => {      //Удаляем сообщение о статусе через 2 секунды
                    statusMessage.remove();
                // }, 2000);    //ПР
            } else {
                // statusMessage.textContent = message.failure;     //ПР
                showThanksModal(message.failure); 
                    
            }
        });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');      //Скрываем модальное окно
    // showModal();    //Делаем так что бы при исполнении функции модальное окно было открыто

    const thanksModal = document.createElement('div');     
    thanksModal.classList.add('modal__dialog');     //Берем стили от удаленного модального окна
    thanksModal.innerHTML = `
        <div class="modal__content"> 
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

showThanksModal(message.success);

});












