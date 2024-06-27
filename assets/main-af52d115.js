(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const normalize = "";
const burgerIcon = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navLink = document.querySelectorAll(".nav__link");
const closeMenu = () => {
  burgerIcon.classList.remove("burger_active-burger");
  nav.classList.remove("nav_active-burger");
  header.classList.remove("header_burger");
  document.body.classList.remove("body_hidden");
};
const openMenu = () => {
  if (!burgerIcon.classList.contains("burger_active-burger")) {
    burgerIcon.classList.add("burger_active-burger");
    nav.classList.add("nav_active-burger");
    header.classList.add("header_burger");
    document.body.classList.add("body_hidden");
    navLink.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  } else {
    closeMenu();
  }
};
const burgerControl = () => {
  burgerIcon.addEventListener("click", openMenu);
};
const getData = (type, title) => {
  return fetch("./data/menuCategoriesData.json").then((response) => response.json()).then((data) => {
    const [{ types }] = data.filter((item) => item.name === type);
    const itemData = types.find((item) => item.title === title);
    const { size: sizeArray, add: addArray } = data.find((item) => item.name === type);
    return { types, itemData, sizeArray, addArray };
  });
};
const btnsType = document.querySelectorAll(".menu__button");
const list = document.querySelector(".menu__list");
const mediaQuery = window.matchMedia("(max-width: 768px");
const refresh = document.querySelector(".menu__refresh");
const hiddenCards = () => {
  const listItems = list.querySelectorAll(".menu-card");
  listItems.forEach((item, i) => {
    if (i >= 4) {
      item.classList.add("menu-card_hidden");
    }
  });
};
const showCards = () => {
  const listItems = list.querySelectorAll(".menu-card");
  listItems.forEach((item, i) => {
    item.classList.remove("menu-card_hidden");
  });
};
const showRefresh = () => {
  refresh.classList.remove("menu__refresh_hidden");
};
const hiddenRefresh = () => {
  refresh.classList.add("menu__refresh_hidden");
};
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
};
const createItem = ({ img, title, descript, price }) => {
  const li = document.createElement("li");
  li.className = "menu__item menu-card";
  li.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="menu-card__img-wrap">
      <img class="menu-card__img" src="${img}" alt="${title}">
      <div class="menu-card__content-wrap">
        <h3 class="menu-card__title">${title}</h3>
        <p class="menu-card__text">${descript}</p>
        <p class="menu-card__price">${price}</p>
      </div>     
    </div>            
  `
  );
  return li;
};
const renderList = (data) => {
  list.append(...data.map(createItem));
  if (data.length <= 4) {
    console.log("sdfsdfsdf");
    hiddenRefresh();
  } else {
    const isWidth = mediaQueryFunc();
    if (isWidth) {
      hiddenCards();
      refresh.classList.remove("menu__refresh_hidden");
    }
  }
};
const btnsTypesControl = () => {
  btnsType.forEach((btn) => {
    btn.addEventListener("click", async () => {
      btnsType.forEach((btn2) => {
        btn2.classList.remove("button-check_active");
        btn2.disabled = false;
      });
      btn.classList.add("button-check_active");
      btn.disabled = true;
      list.innerHTML = "";
      const { types } = await getData(btn.textContent.toLowerCase());
      renderList(types);
    });
  });
};
const refreshBtnControl = () => {
  refresh.addEventListener("click", () => {
    showCards();
    hiddenRefresh();
  });
};
const menuCategoriesControl = async () => {
  const typesStart = await getData("coffee");
  const isWidth = mediaQueryFunc();
  mediaQuery.addEventListener("change", mediaQueryFunc);
  renderList(typesStart.types);
  if (isWidth) {
    hiddenCards();
  }
  btnsTypesControl();
  refreshBtnControl();
};
const cardsList = document.querySelector(".menu__list");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".modal__overlay");
const closeBtn = document.querySelector(".modal__btn-close");
let form;
if (location.pathname.slice(-9) === "menu.html") {
  console.log(location.pathname.slice(-9));
  form = modal.querySelector(".form");
  console.log("form: ", form);
}
const totalPrice = document.querySelector(".modal__total-price");
const showModal = () => {
  modal.classList.remove("modal_hidden");
  document.body.classList.add("body_hidden");
};
const hiddenModal = () => {
  modal.classList.add("modal_hidden");
  document.body.classList.remove("body_hidden");
};
const getTitle = (target) => target.closest(".menu-card").querySelector(".menu-card__title").textContent;
const getTypeName = () => document.querySelector(".button-check_active").textContent.toLowerCase();
const renderContent = (type, data) => {
  const { img, title, descript, price } = data;
  form.dataset.price = price.slice(1);
  const image = modal.querySelector(".modal__img");
  image.src = img;
  const modalTitle = modal.querySelector(".modal__title");
  modalTitle.textContent = title;
  const modalDescript = modal.querySelector(".modal__descript");
  modalDescript.textContent = descript;
  const totalPrice2 = modal.querySelector(".modal__total-price");
  totalPrice2.textContent = price;
};
const renderForm = (sizeArray, addArray) => {
  const modalListBtn = document.querySelectorAll(".modal__list");
  modalListBtn[0].innerHTML = "";
  modalListBtn[1].innerHTML = "";
  modalListBtn[0].insertAdjacentHTML(
    "afterbegin",
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
  `
  );
  modalListBtn[1].insertAdjacentHTML(
    "afterbegin",
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
  `
  );
};
const renderModal = (type, itemData, sizeArray, addArray) => {
  renderContent(type, itemData);
  renderForm(sizeArray, addArray);
};
const getCurrentPrice = () => totalPrice.textContent.slice(1);
const getInputRadios = () => modal.querySelectorAll('input[type="radio"]');
const getInputCheckboxes = () => Array.from(modal.querySelectorAll('input[type="checkbox"]'));
const setTotalPrice = (tempPrice, operand) => {
  if (operand === "plus") {
    totalPrice.textContent = `$${(Number(tempPrice) + 0.5).toFixed(2)}`;
  } else if (operand === "minus") {
    totalPrice.textContent = `$${(+tempPrice - 0.5).toFixed(2)}`;
  }
};
const addActiveClassForLabel = (target) => target.closest(".form__label").classList.add("form__label_active");
const removeActiveClassForLabel = (target) => target.closest(".form__label").classList.remove("form__label_active");
const formControl = ({ target }) => {
  const price = form.dataset.price;
  const inputRadios = getInputRadios();
  const inputCheckboxes = getInputCheckboxes();
  if (target.checked && target.type === "checkbox") {
    const tempPrice = getCurrentPrice();
    setTotalPrice(tempPrice, "plus");
    addActiveClassForLabel(target);
  } else if (!target.checked && target.type === "checkbox") {
    removeActiveClassForLabel(target);
    const tempPrice = getCurrentPrice();
    setTotalPrice(tempPrice, "minus");
  } else if (target.checked && target.type === "radio") {
    inputRadios.forEach((item) => {
      removeActiveClassForLabel(item);
      if (item.checked) {
        addActiveClassForLabel(item);
        const sumAdd = inputCheckboxes.filter((item2) => item2.checked).length * 0.5;
        const tempSum = (Number(price) + sumAdd + Number(item.value)).toFixed(2);
        totalPrice.textContent = `$${tempSum}`;
      }
    });
  }
};
const modalControl = () => {
  cardsList.addEventListener("click", async ({ target }) => {
    if (target.closest(".menu-card")) {
      const type = getTypeName();
      const title = getTitle(target);
      showModal();
      const { itemData, sizeArray, addArray } = await getData(type, title);
      renderModal(type, itemData, sizeArray, addArray);
      form.addEventListener("input", formControl);
    }
  });
  closeBtn.addEventListener("click", hiddenModal);
  overlay.addEventListener("click", (e) => {
    if (e.target.closest(".modal__wrap")) {
      e.stopPropagation();
    } else {
      hiddenModal();
    }
  });
};
const sliderItems = document.querySelectorAll(".favour-card");
const sliderList = document.querySelector(".favourite__list");
const btnLeft = document.querySelector(".favourite__button_left");
const btnRight = document.querySelector(".favourite__button_right");
const bars = Array.from(document.querySelectorAll(".bar__button"));
const length = sliderItems.length;
let currentIndex = -1;
let isPaused = false;
const moveSliderLeft = () => {
  isPaused = true;
  let currentIndex2 = bars.findIndex((item) => item === document.querySelector(".bar__button_active"));
  currentIndex2 += 1;
  if (currentIndex2 >= length) {
    currentIndex2 = 0;
  }
  sliderList.style.transform = `translateX(${-currentIndex2 * 520}px)`;
  bars.forEach((bar) => bar.classList.remove("bar__button_active"));
  bars[currentIndex2].classList.add("bar__button_active");
  sliderList.removeEventListener("mouseover", controlMouseOver);
  sliderList.removeEventListener("mouseout", controlMouseOut);
  setTimeout(() => {
    isPaused = false;
    sliderList.addEventListener("mouseover", controlMouseOver);
    sliderList.addEventListener("mouseout", controlMouseOut);
  }, 5e3);
};
const moveSliderRight = () => {
  isPaused = true;
  let currentIndex2 = bars.findIndex((item) => item === document.querySelector(".bar__button_active"));
  if (currentIndex2 >= length - 1) {
    currentIndex2 = -1;
  }
  currentIndex2 += 1;
  sliderList.style.transform = `translateX(${-currentIndex2 * 520}px)`;
  bars.forEach((bar) => bar.classList.remove("bar__button_active"));
  bars[currentIndex2].classList.add("bar__button_active");
  sliderList.removeEventListener("mouseover", controlMouseOver);
  sliderList.removeEventListener("mouseout", controlMouseOut);
  setTimeout(() => {
    isPaused = false;
    sliderList.addEventListener("mouseover", controlMouseOver);
    sliderList.addEventListener("mouseout", controlMouseOut);
  }, 5e3);
};
const sliderInfinity = () => {
  return setInterval(() => {
    if (!isPaused) {
      if (currentIndex >= 2) {
        currentIndex = -1;
      }
      currentIndex += 1;
      sliderList.style.transform = `translateX(${-currentIndex * 520}px)`;
      bars.forEach((bar) => bar.classList.remove("bar__button_active"));
      bars[currentIndex].classList.add("bar__button_active");
    }
  }, 3e3);
};
const controlMouseOver = () => {
  isPaused = true;
  const activeBar = document.querySelector(".bar__button_active") || bars[0];
  activeBar.style.animationPlayState = "paused";
};
const controlMouseOut = () => {
  const activeBar = document.querySelector(".bar__button_active") || bars[0];
  activeBar.style.animationPlayState = "running";
  isPaused = false;
};
const sliderControl = () => {
  sliderInfinity();
  btnLeft.addEventListener("click", moveSliderLeft);
  btnRight.addEventListener("click", moveSliderRight);
  sliderList.addEventListener("mouseover", controlMouseOver);
  sliderList.addEventListener("mouseout", controlMouseOut);
  sliderList.addEventListener("touchstart", (e) => {
    console.log(e);
    console.log("tachSTART");
  });
  sliderList.addEventListener("touchend", (e) => {
    console.log(e);
    console.log("tachEND");
  });
};
const style = "";
const init = () => {
  burgerControl();
  if (location.pathname.slice(-9) === "menu.html") {
    menuCategoriesControl();
    modalControl();
  } else {
    sliderControl();
  }
};
init();
