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

export const getData = (type) => {  
  return fetch('./data/menuCategoriesData.json')                  
    .then(response => response.json())
    .then(data => {
      const [{ types }] = data.filter(item => item.name === type);      
    
      return types   
    });
}

export const renderList = (data) => {  
  list.append(...data.map(createItem))
}

const refreshShow = () => {
  refresh.classList.remove('menu__refresh_hidden');
  refresh.classList.add('menu__refresh_show');    
};

const refreshHidden = () => {
  refresh.classList.add('menu__refresh_hidden');
  refresh.classList.remove('menu__refresh_show');
};

const refreshControl = (data) => {
  refresh.addEventListener('click', () => {
    renderList(data.slice(4, 8));
    refresh.disabled = true;
    refresh.classList.add('menu__refresh_hidden');
  });
};

export const menuCategoriesControl = () => {

  btnsType.forEach(btn => {
    btn.addEventListener('click', async () => {

      let count = 1;

      btnsType.forEach(btn => {
        btn.classList.remove('button-check_active');
        btn.disabled = false;
      })
      btn.classList.add('button-check_active')
      btn.disabled = true;
      list.innerHTML = '';
      const data = await getData(btn.textContent.toLowerCase());
      console.log('data: ', data);

      if (data.length > 4) {
        refreshShow();
        renderList(data.slice(0, 4));   
        refreshControl(data);
      } else {
        refreshHidden();
        renderList(data);        
        // console.log(list);   
      }

    });
  })

  

  // console.log(data);
};