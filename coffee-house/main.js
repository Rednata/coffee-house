import 'normalize.css';
import { burgerControl } from './script/Burger';
import { loadStartCategory } from './script/LoadStartCategory';
import { menuCategoriesControl } from './script/menuCategoriesControl';
import './style.scss';

console.log(111);

const init = () => {
  burgerControl();
  loadStartCategory();
  menuCategoriesControl();
};

init();