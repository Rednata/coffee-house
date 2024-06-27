import { getData } from "./CommonFunc";

const cardsList = document.querySelector('.menu__list');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.modal__overlay');
const closeBtn = document.querySelector('.modal__btn-close');
let form;
if (location.pathname.slice(-9) === 'menu.html') {
  console.log(location.pathname.slice(-9));
  form = modal.querySelector('.form');
  console.log('form: ', form);
}
// const form = modal.querySelector('.form');

const totalPrice = document.querySelector('.modal__total-price');

const showModal = () => {
  modal.classList.remove('modal_hidden');
  document.body.classList.add('body_hidden');
}

const hiddenModal = () => {
  modal.classList.add('modal_hidden');
  document.body.classList.remove('body_hidden');
}

const getTitle = (target) =>
  target.closest('.menu-card').querySelector('.menu-card__title').textContent;

const getTypeName = () =>
  document.querySelector('.button-check_active').textContent.toLowerCase();

const renderContent = (type, data) => {  
  const {img, title, descript, price} = data;

  form.dataset.price = price.slice(1);

  const image = modal.querySelector('.modal__img');
  image.src = img;

  const modalTitle = modal.querySelector('.modal__title');
  modalTitle.textContent = title;

  const modalDescript = modal.querySelector('.modal__descript');
  modalDescript.textContent = descript;

  const totalPrice = modal.querySelector('.modal__total-price');
  totalPrice.textContent = price;
};

const renderForm = (sizeArray, addArray) => {
  const modalListBtn = document.querySelectorAll('.modal__list');
  modalListBtn[0].innerHTML = '';
  modalListBtn[1].innerHTML = '';
  modalListBtn[0].insertAdjacentHTML('afterbegin', 
  `
    <li class="modal__item">
      <label class="form__label form__label_active" for="sizeS">
        <input class="form__input form__input_S" type="radio" name="size" id="sizeS" value="0">
        ${sizeArray[0]}
      </label>
    </li>
    <li class="modal__item">
      <label class="form__label" for="sizeM">
        <input class="form__input form__input_M" type="radio" name="size" id="sizeM" value="0.5">
        ${sizeArray[1]}
      </label>
    </li>
    <li class="modal__item">
      <label class="form__label" for="sizeL">
        <input class="form__input form__input_L" type="radio" name="size" id="sizeL" value="1">
        ${sizeArray[2]}
      </label>
      </li>
  `);

  modalListBtn[1].insertAdjacentHTML('afterbegin',
  `
    <li class="modal__item">
      <label class="form__label" for="add1">
        <input class="form__input form__input_S" type="checkbox" name="add1" id="add1">
        ${addArray[0]}
      </label>
    </li>
    <li class="modal__item">
      <label class="form__label" for="add2">
        <input class="form__input form__input_M" type="checkbox" name="add2" id="add2">
        ${addArray[1]}
      </label>
    </li>
    <li class="modal__item">
      <label class="form__label" for="add3">
        <input class="form__input form__input_L" type="checkbox" name="add3" id="add3">
        ${addArray[2]}
      </label>
    </li>
  `);
}

const renderModal = (type, itemData, sizeArray, addArray) => {
  renderContent(type, itemData);
  renderForm(sizeArray, addArray);  
};

const getCurrentPrice = () => totalPrice.textContent.slice(1);

const getInputRadios = () => modal.querySelectorAll('input[type="radio"]');

const getInputCheckboxes = () => Array.from(modal.querySelectorAll('input[type="checkbox"]'));

const setTotalPrice = (tempPrice, operand) => {
  if (operand === 'plus') {
    totalPrice.textContent = `$${(Number(tempPrice) + 0.5).toFixed(2)}`;
  } else if (operand === 'minus') {
    totalPrice.textContent = `$${(+tempPrice - 0.5).toFixed(2)}`;
  }
} 

const addActiveClassForLabel = (target) => target.closest('.form__label').classList.add('form__label_active');

const removeActiveClassForLabel = (target) => target.closest('.form__label').classList.remove('form__label_active');

const formControl = ({target}) => {
  const price = form.dataset.price;

  const inputRadios = getInputRadios();
  const inputCheckboxes = getInputCheckboxes();
  
  if (target.checked && target.type === 'checkbox') {
    const tempPrice = getCurrentPrice();
    setTotalPrice(tempPrice, 'plus');
    addActiveClassForLabel(target)
  }
    else if (!target.checked && target.type === 'checkbox') {
    removeActiveClassForLabel(target);
    const tempPrice = getCurrentPrice();
    setTotalPrice(tempPrice, 'minus');
  } 
    else if (target.checked && target.type === 'radio') {    
      inputRadios.forEach(item => {                    
        removeActiveClassForLabel(item);
          if (item.checked) {
            addActiveClassForLabel(item);        
            const sumAdd = inputCheckboxes.filter(item => item.checked).length * 0.5; 
            const tempSum = (Number(price) + sumAdd + Number(item.value)).toFixed(2);
            totalPrice.textContent = `$${tempSum}`;
      }        
    });
  }
}

export const modalControl = () => {
  cardsList.addEventListener('click', async ({ target }) => {
    if (target.closest('.menu-card')) {
      const type = getTypeName();      
      const title = getTitle(target);
      showModal();
      const {itemData, sizeArray, addArray} = await getData(type, title);      
      renderModal(type, itemData, sizeArray, addArray);
      form.addEventListener('input', formControl);
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
