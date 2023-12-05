import 'normalize.css';
import { burgerControl } from './script/Burger';
import { menuCategoriesControl } from './script/menuCategoriesControl';
import './style.scss';

console.log(111);

const init = () => {
  burgerControl();
  menuCategoriesControl();
};

init();