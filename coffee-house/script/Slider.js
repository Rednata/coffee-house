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
  // const activeBar = document.querySelector('.bar__button_active');
  let currentIndex = bars.findIndex(item => item === document.querySelector('.bar__button_active'));
  currentIndex += 1;
  if (currentIndex >=3)  {
    currentIndex = 0;
  }
  
  sliderList.style.transform = `translateX(${-currentIndex * 520}px)`;
  bars.forEach(bar => bar.classList.remove('bar__button_active'))
  bars[currentIndex].classList.add('bar__button_active');
  console.log('currentIndex: ', currentIndex);      
};

const moveSliderRight = () => {
  isPaused = true;
  // const activeBar = document.querySelector('.bar__button_active');
  let currentIndex = bars.findIndex(item => item === document.querySelector('.bar__button_active'));
  if (currentIndex >=2)  {
    currentIndex = -1;
  }
  currentIndex += 1;
  sliderList.style.transform = `translateX(${-currentIndex * 520}px)`;
  bars.forEach(bar => bar.classList.remove('bar__button_active'))
  bars[currentIndex].classList.add('bar__button_active');
  console.log('currentIndex: ', currentIndex);       

};

const sliderInfinity = () => {
  console.log('paused ==', isPaused);
  return setInterval(() => { 
    console.log('paused ==', isPaused);
    if (!isPaused) {
      if (currentIndex >=2)  {
        currentIndex = -1;
      }
      currentIndex += 1;
      sliderList.style.transform = `translateX(${-currentIndex * 520}px)`;
      bars.forEach(bar => bar.classList.remove('bar__button_active'))
      bars[currentIndex].classList.add('bar__button_active');
      console.log('currentIndex: ', currentIndex);      
    }    
  }, 3000);
}

export const sliderControl = () => {
  sliderInfinity();

  btnLeft.addEventListener('click', moveSliderLeft);
  btnRight.addEventListener('click', moveSliderRight);

  sliderList.addEventListener('mouseover', () => {
    console.log('over');
    isPaused = true;    
    const activeBar = document.querySelector('.bar__button_active') || bars[0];
    console.log('activeBar: ', activeBar);
    activeBar.style.animationPlayState = 'paused';
  });
  sliderList.addEventListener('mouseout', () => {
    console.log('OUT');
    const activeBar = document.querySelector('.bar__button_active') || bars[0];
    activeBar.style.animationPlayState = 'running';
    isPaused = false;
  });
};
