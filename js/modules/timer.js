// ТАЙМЕР
    
    function timer(id, deadline) {
    
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
        
        setClock (id, deadline);
        
        
    }

export default timer;