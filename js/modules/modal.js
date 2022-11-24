// Модальное окно
    
function modal() {
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
        
}

module.exports = modal;