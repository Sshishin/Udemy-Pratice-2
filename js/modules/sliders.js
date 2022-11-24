function slider({container, slide, nextArrow, previousArrow, currentCounter, wrapper, inner}) {
    //Slider
// Самостотельно написанный

// const slides = document.querySelectorAll('.offer__slide');
// const prev = document.querySelector('.offer__slider-prev');
// const next = document.querySelector('.offer__slider-next');
// const current = document.getElementById('current');

// let i = 0;

// function hideCard() {
//     slides.forEach(item => {
//         item.classList.add('hide');
//     });
//     current.innerHTML = `0${i+1}`;
// }

// function showCard(){
//     slides[i].classList.remove('hide');
//     slides[i].classList.add('show');
// }

// hideCard();
// showCard();

// prev.addEventListener('click', (e) => {
//     if(i <= 0) {
//         i = 3;
//         hideCard();
//         showCard();
//     } else {
//         hideCard();
//         i--;
//         showCard();
//         current.innerHTML = `0${i+1}`;
//     }
// });

// next.addEventListener('click', (e) => {
//     if(i >= slides.length - 1) {
//         i = 0;
//         hideCard();
//         showCard();
//     } else {
//         hideCard();
//         i++;
//         showCard();
//         current.innerHTML = `0${i+1}`;
//         }
// });



// Более сложный вариант слайдера


const slides = document.querySelectorAll(slide);
const slider = document.querySelector(container);
const prev = document.querySelector(previousArrow);
const next = document.querySelector(nextArrow);
const current = document.getElementById(currentCounter);
const slidesWrapper = document.querySelector(wrapper);
const slidesInner = document.querySelector(inner);
const width = window.getComputedStyle(slidesWrapper).width;     //Получаем примененные свойства из css

let slideIndex = 1;
let offset = 0;

current.innerHTML = `0${slideIndex}`;

slidesInner.style.width = 100 * slides.length + '%';    //Резервируем место под все наши элементы карусели
slidesInner.style.display = 'flex';
slidesInner.style.transition = '0.5s all';
slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;      //Каждый слайд будет равен окну демонстрации
});

slider.style.position = 'relative';

const indicators = document.createElement('ol');
const dots = [];
indicators.classList.add('carousel-indicators');

indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);

    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;

    if(i == 0) {
        dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
}

next.addEventListener('click', () => {
if(offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
    offset = 0;
} else {
    offset += +width.replace(/\D/g, '')
}

    slidesInner.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    current.innerHTML = `0${slideIndex}`;

    dots.forEach(item => item.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
    if(offset == 0) {
        offset = +width.replace(/\D/g, '') * (slides.length - 1);
    } else {
        offset -= +width.replace(/\D/g, '');
    }
    
        slidesInner.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
    
        current.innerHTML = `0${slideIndex}`;

        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset =+width.replace(/\D/g, '') * (slideTo - 1);
        slidesInner.style.transform = `translateX(-${offset}px)`;

        current.innerHTML = `0${slideIndex}`;


        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

});
}

export default slider;