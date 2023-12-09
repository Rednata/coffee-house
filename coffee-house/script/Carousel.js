const listCarousel = document.querySelector('.favourite__list');
const itemsCarousel = document.querySelectorAll('.favourite__item');
const innerWrapCarousel = document.querySelector('.favourite__inner-wrap');
const btnLeft = document.querySelector('.favourite__button_left');
const btnRight = document.querySelector('.favourite__button_right');

// const widthCarousel = 480;
const widthCarousel = 520;

const moveLeft = (animaSlider) => {
  
  animaSlider.forEach(anima => {    
    anima.cancel() ;
    // anima.addEventListener('onfinish', () => {
    //   console.log('FINISH!');
    // })

  });
  let pos = listCarousel.dataset.count || 0;
  if (pos <= 0) {
    pos = 3
  }
  pos--;      
  listCarousel.dataset.count = pos;
  listCarousel.style.transform = `translateX(-${widthCarousel * pos}px)`;  
};

const moveRight = (animaSlider) => {  

  animaSlider.forEach(anima => {    
    anima.cancel() ;
    // anima.addEventListener('onfinish', () => {
    //   console.log('FINISH!');
    // })

  });

  let pos = listCarousel.dataset.count || 0;  
  pos++;      
  if (pos >=3) {
    pos = 0;
  }  
  listCarousel.dataset.count = pos;
  listCarousel.style.transform = `translateX(${-widthCarousel * pos}px)`;
};



export const carouselControl1 = () => {
  btnLeft.addEventListener('click', moveLeft);
  btnRight.addEventListener('click', moveRight);

  const animaSlider = animaControl(listCarousel);

  listCarousel.addEventListener('mouseover', () => {
    animaSlider.pause();      
  })

  listCarousel.addEventListener('mouseout', () => {
    animaSlider.play()
  })
};

const carouselInfinite = () => {
  const timings0 = {
    duration: 3000,
    fill: 'forwards',
    iterations: 1,  
    easing: 'cubic-bezier(0.1, 0.7, 1, 0.1)',
  }
    const timings1 = {
    duration: 3000,
    fill: 'forwards',
    iterations: 1,  
    easing: 'cubic-bezier(0.1, 0.7, 1, 0.1)',
  }
    const timings2 = {
      duration: 3000,
      fill: 'forwards',
      iterations: 1,  
      easing: 'cubic-bezier(0.1, 0.7, 1, 0.1)',
  }
  const keyframes0 = [
    { transform: "translateX(300px)"},      
    { transform: "translateX(-480px)"},
  ];
  
  const keyframes1 = [
    { transform: "translateX(-250px)"},      
    { transform: "translateX(-1000px)"},
  ];
  
  const keyframes2 = [
    { transform: "translateX(-560px)"},      
    { transform: "translateX(-1550px)"},
  ];
  
  const effect0 = new KeyframeEffect(itemsCarousel[0], keyframes0, timings0);
  const animaSlider0 = new Animation(effect0, itemsCarousel[0].ownerDocument.timeline);
  animaSlider0.play();
  
  const effect1 = new KeyframeEffect(itemsCarousel[1], keyframes1, timings1);
  const animaSlider1 = new Animation(effect1, itemsCarousel[1].ownerDocument.timeline);
  
  const effect2 = new KeyframeEffect(itemsCarousel[2], keyframes2, timings2);
  const animaSlider2 = new Animation(effect2, itemsCarousel[2].ownerDocument.timeline);
  
  animaSlider0.addEventListener('finish', () => {
    animaSlider1.play();
  })
  
  animaSlider1.addEventListener('finish', () => {
    animaSlider2.play();
  })
  
  animaSlider2.addEventListener('finish', () => {
    animaSlider0.play();
  })
  
  listCarousel.addEventListener('mouseover', () => {    
    if (animaSlider0.playState === 'running') {
      animaSlider0.pause()
    }
    if (animaSlider1.playState === 'running') {
      animaSlider1.pause()
    }
    if (animaSlider2.playState === 'running') {
      animaSlider2.pause()
    }
  })
  
  return [animaSlider0, animaSlider1, animaSlider2];
}

export const carouselControl = () => {

  const animaSlider = carouselInfinite();
  const [animaSlider0, animaSlider1, animaSlider2] = animaSlider;

btnLeft.addEventListener('click', () => {
  moveLeft(animaSlider);
});
btnRight.addEventListener('click', () => {
  moveRight(animaSlider)});

listCarousel.addEventListener('mouseout', () => {
  if (animaSlider0.playState === 'paused') {
    animaSlider0.play()
  }
  if (animaSlider1.playState === 'paused') {
    animaSlider1.play()
  }
  if (animaSlider2.playState === 'paused') {
    animaSlider2.play()
  }
})
};
