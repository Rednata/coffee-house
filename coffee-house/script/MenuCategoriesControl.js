import { getData } from './CommonFunc.js';

const btnsType = document.querySelectorAll('.menu__button');
const list = document.querySelector('.menu__list');
const mediaQuery = window.matchMedia('(max-width: 768px');
const refresh = document.querySelector('.menu__refresh');

const hiddenCards = () => {
  const listItems = list.querySelectorAll('.menu-card');  
  listItems.forEach((item, i) => {
    if (i >= 4) {        
      item.classList.add('menu-card_hidden')
    }
  }) 
}

const showCards = () => {
  const listItems = list.querySelectorAll('.menu-card');   
  listItems.forEach((item, i) => {    
      item.classList.remove('menu-card_hidden')    
  }) 
}

const showRefresh = () => {
  refresh.classList.remove('menu__refresh_hidden')
}

const hiddenRefresh = () => {
  refresh.classList.add('menu__refresh_hidden')
}

const mediaQueryFunc = () => {
  if (mediaQuery.matches) {    
    hiddenCards();    
    showRefresh();
    return true;
  } else {
    showCards();
    hiddenRefresh();
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
      <div class="menu-card__content-wrap">
        <h3 class="menu-card__title">${title}</h3>
        <p class="menu-card__text">${descript}</p>
        <p class="menu-card__price">${price}</p>
      </div>     
    </div>            
  `)
  return li;
};

export const renderList = (data) => {  
  
    list.append(...data.map(createItem))
    if (data.length <= 4) {
      console.log('sdfsdfsdf');
      hiddenRefresh();
    } else {
      const isWidth = mediaQueryFunc();
      console.log('isWidth: ', isWidth);
      if (isWidth) {
        hiddenCards();    
        refresh.classList.remove('menu__refresh_hidden')
      }
    }
    
}

const btnsTypesControl = () => {
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
      renderList(types);
    });
  })
}

const refreshBtnControl = () => {
  refresh.addEventListener('click', () => {
    showCards();
    hiddenRefresh();
  })
}

export const menuCategoriesControl = async () => {
  
  const typesStart = await getData('coffee');
  const isWidth = mediaQueryFunc();

  mediaQuery.addEventListener('change', mediaQueryFunc);
  renderList(typesStart.types);
  if (isWidth) {
    hiddenCards();    
  }

  btnsTypesControl();
  refreshBtnControl();
};


