const cardsList = document.querySelector('.menu__list');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.modal__overlay');
const closeBtn = document.querySelector('.modal__btn-close');
console.log('closeBtn: ', closeBtn);

const showModal = () => {
  modal.classList.remove('modal_hidden');
  document.body.classList.add('body_hidden');
}

const hiddenModal = () => {
  modal.classList.add('modal_hidden');
  document.body.classList.remove('body_hidden');
}

export const modalControl = () => {
  cardsList.addEventListener('click', ({ target }) => {
    if (target.closest('.menu-card')) {
      showModal()
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
