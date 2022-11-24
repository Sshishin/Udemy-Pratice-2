// Модальное окно

function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector); 
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //Так запрещаем скролл при открытом модальном окне
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
    }
    
    function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector); 
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';  
           //Если пользователь уже открыл окно, то убираем вызов через время
    }
    
    
function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
    //   modalClose = document.querySelector('[data-close]');  //Рефактор
      modal = document.querySelector(modalSelector);      
    
    for(let i = 0; i < modalTrigger.length; i++) {
    modalTrigger[i].addEventListener('click',() => showModal(modalSelector, modalTimerId));   
    }
    

    // modalClose.addEventListener('click', () => {
    //     closeModal();       //Так говорим чтобы браузер сам определился какое значение ему нужно
    // });  Рефактор
    
    
    // Делаем закрытие по темной области вне окна
    
    modal.addEventListener('click', (event) => {
    if(event.target == modal || event.target.getAttribute('data-close') == '') {       //После рефактора
        closeModal(modalSelector); 
    }
    });
    
    
    // Делаем чтобы окно закрывалось при нажатии кнопки esc
    
    document.addEventListener('keydown', (e) => {
    if(e.code == 'Escape' && modal.classList.contains('show')) {
    closeModal(modalSelector);
    }
    });
    
    
    function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {       // Если пролистанная часть страницы + видимая часть страницы >= всей страницы то...
        showModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll',showModalByScroll);     //Делаем так чтобы при долистывании до конца страницы, окно появлялось только один раз
    }
    }
    
    window.addEventListener('scroll',showModalByScroll);
        
}

export default modal;
export {closeModal};
export {showModal};