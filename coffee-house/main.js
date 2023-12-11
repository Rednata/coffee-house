import 'normalize.css';
import { burgerControl } from './script/Burger';
import { carouselControl } from './script/Carousel';
import { menuCategoriesControl } from './script/menuCategoriesControl';
import { modalControl } from './script/ModalControl';
import './style.scss';

const init = () => {
  console.log(`
1. Не реализован свайп (не успела)
2. Бесконечная прокрутка слайдера не возобновляется после взаимодействями с кнопками управления слайдером
`);
  burgerControl();
  if (location.pathname.slice(-9) === 'menu.html') {
    menuCategoriesControl();
    modalControl();
  } else {
  carouselControl();
  }
};

init();