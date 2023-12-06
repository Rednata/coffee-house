import { getData } from "./menuCategoriesControl";

const cardsList = document.querySelector('.menu__list');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.modal__overlay');
const closeBtn = document.querySelector('.modal__btn-close');
const modalWrap = document.querySelector('.modal__wrap');

const showModal = () => {
  modal.classList.remove('modal_hidden');
  document.body.classList.add('body_hidden');
}

const hiddenModal = () => {
  modal.classList.add('modal_hidden');
  document.body.classList.remove('body_hidden');
}

const renderModal = (type, itemData, sizeArray, addArray) => {
  console.log('addArray: ', addArray);
  console.log('sizeArray: ', sizeArray);
  const {img, title, descript, price} = itemData;
  const image = modal.querySelector('.modal__img');
  image.src = img;
  const modalTitle = modal.querySelector('.modal__title');
  modalTitle.textContent = title;
  const modalDescript = modal.querySelector('.modal__descript');
  modalDescript.textContent = descript;
  const totalPrice = modal.querySelector('.modal__total-price');
  totalPrice.textContent = price;

  const modalListBtn = document.querySelectorAll('.modal__list');
  modalListBtn[0].innerHTML = '';
  modalListBtn[1].innerHTML = '';
  modalListBtn[0].insertAdjacentHTML('afterbegin', 
  `
    <li class="modal__item">
      <button class="button-check button-check_active modal__btn modal__btn_S">${sizeArray[0]}</button>
    </li>
    <li class="modal__item">
      <button class="button-check modal__btn modal__btn_M">${sizeArray[1]}</button>
    </li>
    <li class="modal__item">
      <button class="button-check modal__btn modal__btn_L">${sizeArray[2]}</button>
    </li>
  `);

  modalListBtn[1].insertAdjacentHTML('afterbegin',
  `
    <li class="modal__item">
      <button class="button-check modal__btn modal__btn_1">${addArray[0]}</button>
    </li>
    <li class="modal__item">
      <button class="button-check modal__btn modal__btn_2">${addArray[1]}</button>
    </li>
    <li class="modal__item">
      <button class="button-check modal__btn modal__btn_3">${addArray[2]}</button>
    </li>
  `);
};

export const modalControl = () => {
  cardsList.addEventListener('click', async ({ target }) => {
    if (target.closest('.menu-card')) {
      const type = document.querySelector('.button-check_active')
        .textContent.toLowerCase();
      console.log('type : ', type );
      showModal()      
      const title = target.closest('.menu-card').querySelector('.menu-card__title').textContent;      

      const {itemData, sizeArray, addArray} = await getData(type, title);      

      renderModal(type, itemData, sizeArray, addArray);
    }    
  });

  closeBtn.addEventListener('click', hiddenModal);
  overlay.addEventListener('click', (e) => {
    if (e.target.closest('.modal__wrap')) {
      e.stopPropagation();
    } else {
      hiddenModal();
    }
  });
  

  
  
};
