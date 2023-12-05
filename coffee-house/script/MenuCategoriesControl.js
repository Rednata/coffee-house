const menuBtnWrap = document.querySelector('.menu__btn-wrap')
const btnsType = document.querySelectorAll('.menu__button');
const list = document.querySelector('.menu__list');

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

const getData = (type) => {
  
  fetch('./data/menuCategoriesData.json')                  
    .then(response => response.json())
    .then(data => {
      const [{ types }] = data.filter(item => item.name === type);
      console.log('result: ', types);
      
      list.append(...types.map(createItem))
      // console.log(types.map(createItem));      
      console.log(list);
      // menuBtnWrap.append(list)      ;

    });
}

export const menuCategoriesControl = () => {

  btnsType.forEach(btn => {
    btn.addEventListener('click', () => {

      btnsType.forEach(btn => {
        btn.classList.remove('button-check_active');
        btn.disabled = false;
      })
      btn.classList.add('button-check_active')
      btn.disabled = true;
      list.innerHTML = '';
      getData(btn.textContent.toLowerCase());
    });
  })

  

  // console.log(data);
};