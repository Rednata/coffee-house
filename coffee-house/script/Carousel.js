const listCarousel = document.querySelector('.favourite__list');
const itemsCarousel = document.querySelectorAll('.favourite__item');
const innerWrapCarousel = document.querySelector('.favourite__inner-wrap');
const btnLeft = document.querySelector('.favourite__button_left');
const btnRight = document.querySelector('.favourite__button_right');

const widthCarousel = 520;
// const widthCarousel = document.querySelector('.favour-card').offsetWidth;
// console.log('widthCarousel: ', widthCarousel);
// console.log(document.querySelector('.favour-card'));


const moveLeft = () => {
  
  let pos = listCarousel.dataset.count || 0;
  
  if (pos <= 0) {
    pos = 3
  }
  pos--;      
  listCarousel.dataset.count = pos;
  listCarousel.style.transform = `translateX(-${widthCarousel * pos}px)`;  
};

const moveRight = () => {  
  let pos = listCarousel.dataset.count || 0;  
  pos++;      
  if (pos >=3) {
    pos = 0;
  }  
  listCarousel.dataset.count = pos;
  listCarousel.style.transform = `translateX(${-widthCarousel * pos}px)`;
};

export const carouselControl = () => {
  btnLeft.addEventListener('click', moveLeft);
  btnRight.addEventListener('click', moveRight);
};
