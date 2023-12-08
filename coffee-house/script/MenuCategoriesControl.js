import { getData } from './CommonFunc.js';

const menuBtnWrap = document.querySelector('.menu__btn-wrap')
const btnsType = document.querySelectorAll('.menu__button');
const list = document.querySelector('.menu__list');
const refresh = document.querySelector('.menu__refresh');
let refreshFlag = false;
let data = [];

const changeColor = (color) => {
  document.body.style.color = color;
}

const mediaQuery = window.matchMedia('(max-width: 768px');

const mediaQueryFunc = async () => {
  const type = list.dataset.name;

  if (mediaQuery.matches) {    
    console.log('меньше 768 true');
    changeColor("tomato");    

    const { types } = await getData(type);
    console.log('types: ', types);
    data = [...types.slice(0, 4)];
    console.log('data: ', data);
    // renderList(types.slice(0, 4));
    // const removeItems = listItems.slice(4, 8);
    // if (removeItems.length) {
    //   console.log('removeItems: ', removeItems);
    //   listItems[0].remove();
    //   listItems[1].remove();
    //   listItems[2].remove();
    //   listItems[3].remove();
    // }
    
    return true;
  } else {

    const { types } = await getData(type);
    console.log('types: ', types);
    data = [...types];
    console.log('data: ', data);
    changeColor("violet");

    console.log('больше 768 false');    
    return false;
  }
  
}

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


export const renderList = (data) => {  
  console.warn('data: ', data);
  
  // if (mediaQueryFunc()) {
  //   list.append(...data.slice(0, 4).map(createItem))  
  // } else {
    list.append(...data.map(createItem))
  // }

}

export const menuCategoriesControl = (typesStart) => {
  console.log('typesStart: ', typesStart);
  // mediaQueryFunc();
  mediaQuery.addEventListener('change', mediaQueryFunc);
  renderList(data);

};



// btnsType.forEach(btn => {
//   btn.addEventListener('click', async () => {

//     btnsType.forEach(btn => {
//       btn.classList.remove('button-check_active');
//       btn.disabled = false;
//     })
//     btn.classList.add('button-check_active')
//     btn.disabled = true;
//     list.innerHTML = '';
//     const { types } = await getData(btn.textContent.toLowerCase());
//     console.log('types: ', types);
    
//     renderList(types);

//   });
// })