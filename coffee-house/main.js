import 'normalize.css';
import { burgerControl } from './script/Burger';
import { menuCategoriesControl } from './script/menuCategoriesControl';
import { modalControl } from './script/ModalControl';
import { sliderControl } from './script/Slider';
import './style.scss';

const init = () => {
  burgerControl();
  if (location.pathname.slice(-9) === 'menu.html') {
    menuCategoriesControl();
    modalControl();
  } else {
  sliderControl();
  }
};

init();