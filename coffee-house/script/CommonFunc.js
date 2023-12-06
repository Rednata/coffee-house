const mediaQuery = window.matchMedia('(max-width: 768px');

export const mediaQueryFunc = () => {
  if (mediaQuery.matches) {
    console.log('меньше 768 true');
    return true;
  } else {
    console.log('больше 768 false');
    return false;
  }
}

mediaQuery.addEventListener('change', mediaQueryFunc);