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

const renderModal = ({img, title, descript, price}) => {
  console.log('title: ', title);
  const image = modal.querySelector('.modal__img');
  image.src = img;
  const modalTitle = modal.querySelector('.modal__title');
  modalTitle.textContent = title;
  const modalDescript = modal.querySelector('.modal__descript');
  modalDescript.textContent = descript;
  const totalPrice = modal.querySelector('.modal__total-price');
  totalPrice.textContent = price;
};

export const modalControl = () => {
  cardsList.addEventListener('click', async ({ target }) => {
    if (target.closest('.menu-card')) {
      const type = document.querySelector('.button-check_active')
        .textContent.toLowerCase();
      console.log('type : ', type );
      showModal()      
      const title = target.closest('.menu-card').querySelector('.menu-card__title').textContent;      

      const [types, itemData] = await getData(type, title);      

      renderModal(itemData);
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
