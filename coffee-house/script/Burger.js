const burgerIcon = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navLink = document.querySelectorAll('.nav__link');

const closeMenu = () => {
  burgerIcon.classList.remove('burger_active-burger');
  nav.classList.remove('nav_active-burger');
  header.classList.remove('header_burger');
  document.body.classList.remove('body_hidden');
};

const openMenu = () => {
  if (!(burgerIcon.classList.contains('burger_active-burger'))) {
    burgerIcon.classList.add('burger_active-burger');
    nav.classList.add('nav_active-burger');
    header.classList.add('header_burger');
    document.body.classList.add('body_hidden');
    navLink.forEach(link => {
      link.addEventListener('click', closeMenu)
    });
  } else {
    closeMenu()
  }
};

export const burgerControl = () => {
  burgerIcon.addEventListener('click', openMenu);
};