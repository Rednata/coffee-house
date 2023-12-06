import 'normalize.css';
import { burgerControl } from './script/Burger';
import { getData, menuCategoriesControl } from './script/menuCategoriesControl';
import { modalControl } from './script/ModalControl';
import './style.scss';

console.log(111);

const init = async () => {
  burgerControl();
  const data = await getData('coffee');
  menuCategoriesControl(data);
  modalControl();
};

init();