const burgerIcon = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.logo');
const header = document.querySelector('.header');


export const burgerControl = () => {
  const openMenu = () => {
    burgerIcon.classList.add('burger_active');
    nav.classList.add('nav_active-burger');
    logo.classList.add('logo_active-burger');
    header.classList.add('header_burger');
    document.body.classList.add('body_hidden');
  };

  burgerIcon.addEventListener('click', openMenu);
};