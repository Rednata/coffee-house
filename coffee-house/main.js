import 'normalize.css';
import { burgerControl } from './script/Burger';
import { carouselControl } from './script/Carousel';
import { menuCategoriesControl } from './script/menuCategoriesControl';
// import { getData } from './script/CommonFunc';
import { modalControl } from './script/ModalControl';
import './style.scss';

console.log(111);

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