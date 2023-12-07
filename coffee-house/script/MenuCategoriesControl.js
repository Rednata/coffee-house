import { mediaQueryFunc } from './CommonFunc.js';

const menuBtnWrap = document.querySelector('.menu__btn-wrap')
const btnsType = document.querySelectorAll('.menu__button');
const list = document.querySelector('.menu__list');
const refresh = document.querySelector('.menu__refresh');

const createItem = ({ img, title, descript, price }) => {
  const li = document.createElement('li');
  li.className = 'menu__item menu-card';
  li.insertAdjacentHTML('afterbegin',
  `
    <div class="menu-card__img-wrap">
      <img class="menu-card__img" src="${img}" alt="${title}">
    </div>            
    <div class="menu-card__content-wrap">
      <h3 class="menu-card__title">${title}</h3>
      <p class="menu-card__text">${descript}</p>
      <p class="menu-card__price">${price}</p>
    </div>     
  `)
  return li;
};

export const getData = (type, title) => {  
  return fetch('./data/menuCategoriesData.json')                  
    .then(response => response.json())
    .then(data => {      
      const [{ types }] = data.filter(item => item.name === type);      
      const itemData = types.find(item => item.title === title);            
      const { size: sizeArray, add: addArray } = data.find(item => item.name === type);
            
      return { types, itemData, sizeArray, addArray };
    });
}

export const renderList = (data) => {  
  const isWidth = mediaQueryFunc();

  if (isWidth) {
    list.append(...data.slice(0, 4).map(createItem))  
  } else {
    list.append(...data.map(createItem))
  }
}

export const menuCategoriesControl = (typesStart) => {
  if (typesStart) renderList(typesStart);

  btnsType.forEach(btn => {
    btn.addEventListener('click', async () => {

      btnsType.forEach(btn => {
        btn.classList.remove('button-check_active');
        btn.disabled = false;
      })
      btn.classList.add('button-check_active')
      btn.disabled = true;
      list.innerHTML = '';
      const { types } = await getData(btn.textContent.toLowerCase());
      console.log('types: ', types);
      
      renderList(types);

    });
  })
};