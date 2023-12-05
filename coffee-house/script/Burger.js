const burgerIcon = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const openMenu = () => {
  burgerIcon.classList.add('burger_active-burger');
  nav.classList.toggle('nav_active-burger');
  header.classList.add('header_burger');
  document.body.classList.add('body_hidden');
  
};

const closeMenu = () => {
  burgerIcon.classList.remove('burger_active-burger');
  header.classList.remove('header_burger');
  document.body.classList.remove('body_hidden');
};

export const burgerControl = () => {


  burgerIcon.addEventListener('click', openMenu);
};