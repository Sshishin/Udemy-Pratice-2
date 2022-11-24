import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
       // Forms
    
       const forms = document.querySelectorAll(formSelector);    //Получаем все формы
    
       const message = {
           loading: 'img/form/spinner.svg',
           success: 'Все прошло успешно',
           failure: 'Произошла ошибка!'
       };
       
       forms.forEach(item => {     //Присваиваем обработчик для каждой формы
           bindPostData(item);
       });
   
       
       
       function bindPostData(form) {       //Функция постинга
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
           
               
       
               // request.setRequestHeader('Content-type', 'multipart/form-data');     //В комбинации XML и FormData заголовок не используется и ставиться автоматически
               // request.setRequestHeader('Content-type', 'application/json');       //Для отправки в json формате
               // formData - это один из форматов обмена данными с сервером как и json и такой формат сам формирует данные из форм
               const formData = new FormData(form);
       
               // request.send(formData);
       
               // ****** Преобразование formdata к json формату
       
               // const object = {}
               // formData.forEach((value, key) => {
               //     object[key] = value;
               // });  Убрали после рефакторинга и заменили json
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));  //Замена object  //Сначала создаем массив массивов, потом приводим обратно к объекту и передаем в json
       
               // ******
       
               // fetch('server.php', {
               //     method: "POST",
               //     headers: {
               //         'Content-type': 'application/json'
               //     },
               //     body: JSON.stringify(object)
               // })   //Произошел рефакторинг
               
               postData(' http://localhost:3000/requests', json)
               // .then(data => data.text())      //Реф и убрали так как происходит на этапе postData
               .then(data => {
                   console.log(data);
                   showThanksModal(message.success);
                   statusMessage.remove();
               }).catch(() => {
                   showThanksModal(message.failure); 
               }).finally(() => {
                   form.reset(); 
               });
           });
       }
       
       // *******
       
       function showThanksModal(message) {
           const prevModalDialog = document.querySelector('.modal__dialog');
           prevModalDialog.classList.add('hide');      //Скрываем модальное окно
           showModal('.modal', modalTimerId);    //Делаем так что бы при исполнении функции модальное окно было открыто
       
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
               closeModal('.modal');
           }, 4000);
       }
       
       showThanksModal(message.success);
          
}

export default forms;