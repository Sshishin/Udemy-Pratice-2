function tabs() {
    //Табы
    
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
}

module.exports = tabs;