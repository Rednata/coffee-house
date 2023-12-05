import { getData, renderList } from "./menuCategoriesControl";

const mediaQuery = window.matchMedia('(max-width: 768px');

const mediaQueryFunc = (mediaQuery) => {
  if (mediaQuery.matches) {
    return false;
  } else {
    return true;
  }
}

// mediaQuery.addEventListener('change', mediaQueryFunc);

export const loadStartCategory = async() => {
  const data = await getData('coffee');
  if (mediaQueryFunc(mediaQuery)) {
    renderList(data);
  } else {
    renderList(data.slice(0, 4))
  }
};