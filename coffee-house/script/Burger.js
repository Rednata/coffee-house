const burgerIcon = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navLink = document.querySelectorAll('.nav__link');


const openMenu = () => {
  burgerIcon.classList.toggle('burger_active-burger');
  nav.classList.toggle('nav_active-burger');
  header.classList.toggle('header_burger');
  document.body.classList.toggle('body_hidden');
};
;

export const burgerControl = () => {
  burgerIcon.addEventListener('click', openMenu);
  navLink.forEach(link => {
    link.addEventListener('click', openMenu)
  })
};