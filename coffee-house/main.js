import 'normalize.css';
import { burgerControl } from './script/Burger';
import { carouselControl } from './script/Carousel';
import { menuCategoriesControl } from './script/menuCategoriesControl';
import { modalControl } from './script/ModalControl';
import './style.scss';

console.log(`
1. Не реализован свайп (не успела)
2. Бесконечная прокрутка слайдера не возобновляется после взаимодействями с кнопками управления слайдером
`);

const init = async () => {
  burgerControl();
  if (location.pathname === '/menu.html') {
    // const { types } = await getData('coffee');
    menuCategoriesControl();
    modalControl();
  }
  if (location.pathname === '/') {
    carouselControl();
  }

};

init();