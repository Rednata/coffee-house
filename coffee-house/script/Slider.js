const sliderItems = document.querySelectorAll('.favour-card');
const sliderList = document.querySelector('.favourite__list');
const btnLeft = document.querySelector('.favourite__button_left');
const btnRight = document.querySelector('.favourite__button_right');
const bars = Array.from(document.querySelectorAll('.bar__button'));

const length = sliderItems.length;
let currentIndex = -1;
let isPaused = false;

const moveSliderLeft = () => {
  isPaused = true;  
  let currentIndex = bars.findIndex(item => item === document.querySelector('.bar__button_active'));
  currentIndex += 1;
  if (currentIndex >=length)  {
    currentIndex = 0;
  }
  
  sliderList.style.transform = `translateX(${-currentIndex * 520}px)`;
  bars.forEach(bar => bar.classList.remove('bar__button_active'))
  bars[currentIndex].classList.add('bar__button_active');  
  sliderList.removeEventListener('mouseover', controlMouseOver);
  sliderList.removeEventListener('mouseout', controlMouseOut);
  setTimeout(() => {
    isPaused = false;
    sliderList.addEventListener('mouseover', controlMouseOver);
    sliderList.addEventListener('mouseout', controlMouseOut);
  }, 5000)
}

const moveSliderRight = () => {  
  isPaused = true;  
  let currentIndex = bars.findIndex(item => item === document.querySelector('.bar__button_active'));
  if (currentIndex >=length - 1)  {
    currentIndex = -1;
  }
  currentIndex += 1;
  sliderList.style.transform = `translateX(${-currentIndex * 520}px)`;
  bars.forEach(bar => bar.classList.remove('bar__button_active'))
  bars[currentIndex].classList.add('bar__button_active');  
  sliderList.removeEventListener('mouseover', controlMouseOver);
  sliderList.removeEventListener('mouseout', controlMouseOut);
  setTimeout(() => {
    isPaused = false;
    sliderList.addEventListener('mouseover', controlMouseOver);
    sliderList.addEventListener('mouseout', controlMouseOut);
  }, 5000)
  
};

const sliderInfinity = () => {  
  return setInterval(() => {     
    if (!isPaused) {
      if (currentIndex >=2)  {
        currentIndex = -1;
      }
      currentIndex += 1;
      sliderList.style.transform = `translateX(${-currentIndex * 520}px)`;
      bars.forEach(bar => bar.classList.remove('bar__button_active'))
      bars[currentIndex].classList.add('bar__button_active');      
    }    
  }, 3000);
}

const controlMouseOver = () => {  
  isPaused = true;    
  const activeBar = document.querySelector('.bar__button_active') || bars[0];    
  activeBar.style.animationPlayState = 'paused';
}

const controlMouseOut = () => {  
  const activeBar = document.querySelector('.bar__button_active') || bars[0];
  activeBar.style.animationPlayState = 'running';
  isPaused = false;
}

export const sliderControl = () => {
  sliderInfinity();
  btnLeft.addEventListener('click', moveSliderLeft);
  btnRight.addEventListener('click', moveSliderRight);
  sliderList.addEventListener('mouseover', controlMouseOver);
  sliderList.addEventListener('mouseout', controlMouseOut);

  sliderList.addEventListener('touchstart', (e) => {
    console.log(e);
    console.log('tachSTART');
    
  })
  sliderList.addEventListener('touchend', (e) => {
    console.log(e);
    console.log('tachEND');
  })
  
};
