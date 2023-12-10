const listCarousel = document.querySelector('.favourite__list');
const itemsCarousel = document.querySelectorAll('.favourite__item');
const innerWrapCarousel = document.querySelector('.favourite__inner-wrap');
const btnLeft = document.querySelector('.favourite__button_left');
const btnRight = document.querySelector('.favourite__button_right');
const bars = document.querySelectorAll('.bar__button');
console.log('bars: ', bars);

// const widthCarousel = 480;
const widthCarousel = 520;

const moveLeft = (animaSlider) => {  
  animaSlider.forEach(anima => {    
    anima.cancel() ;
  });
  let pos = listCarousel.dataset.count || 0;
  if (pos <= 0) {
    pos = 3
  }
  pos--;      
  listCarousel.dataset.count = pos;
  listCarousel.style.transform = `translateX(-${widthCarousel * pos}px)`;  
  bars.forEach(bar => bar.classList.remove('bar__button_active'))
  bars[pos].classList.add('bar__button_active');

  // animaSlider.forEach(anima => {    
  //   anima.pause() ;
  // });
  // animaSlider[0].play();

  
};

const moveRight = (animaSlider) => {  
  animaSlider.forEach(anima => {    
    anima.cancel() ;
  });
  let pos = listCarousel.dataset.count || 0;  
  pos++;      
  if (pos >=3) {
    pos = 0;
  }  
  listCarousel.dataset.count = pos;
  listCarousel.style.transform = `translateX(${-widthCarousel * pos}px)`;
  bars.forEach(bar => bar.classList.remove('bar__button_active'))
  bars[pos].classList.add('bar__button_active');
};

const carouselInfinite = () => {
  const timings = {
    duration: 3000,
    fill: 'forwards',
    iterations: 1,  
    easing: 'cubic-bezier(0.1, 0.7, 1, 0.1)',
  }

  const timingsBar = {
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

  const keyframesBar = [
    { width: "0"},      
    { width: "40px"},
  ];

  const effect0 = new KeyframeEffect(itemsCarousel[0], keyframes0, timings);
  const animaSlider0 = new Animation(effect0, itemsCarousel[0].ownerDocument.timeline);
  animaSlider0.play();
  
  const effect1 = new KeyframeEffect(itemsCarousel[1], keyframes1, timings);
  const animaSlider1 = new Animation(effect1, itemsCarousel[1].ownerDocument.timeline);
  
  const effect2 = new KeyframeEffect(itemsCarousel[2], keyframes2, timings);
  const animaSlider2 = new Animation(effect2, itemsCarousel[2].ownerDocument.timeline);

  const effectBar0 = new KeyframeEffect(bars[0], keyframesBar, timingsBar)
  const animaBar0 = new Animation(effectBar0, bars[0].ownerDocument.timeline)

  const effectBar1 = new KeyframeEffect(bars[1], keyframesBar, timingsBar)
  const animaBar1 = new Animation(effectBar1, bars[1].ownerDocument.timeline)

  const effectBar2 = new KeyframeEffect(bars[2], keyframesBar, timingsBar)
  const animaBar2 = new Animation(effectBar2, bars[0].ownerDocument.timeline)
  
  animaSlider0.addEventListener('finish', () => {
    animaSlider1.play();
    animaBar1.play();
    animaBar0.cancel();
    animaBar2.cancel();
      
    
  })
  
  animaSlider1.addEventListener('finish', () => {
    animaSlider2.play();
    animaBar2.play();
    animaBar1.cancel();
    animaBar0.cancel();
    
  })
  
  animaSlider2.addEventListener('finish', () => {
    animaSlider0.play();
    animaBar0.play();
    animaBar1.cancel();
    animaBar2.cancel();
    
  })
  
  // listCarousel.addEventListener('mouseover', () => {    
  //   if (animaSlider0.playState === 'running') {
  //     animaSlider0.pause()
  //     animaBar0.pause()
  //   }
  //   if (animaSlider1.playState === 'running') {
  //     animaSlider1.pause()
  //     animaBar1.pause()
  //   }
  //   if (animaSlider2.playState === 'running') {
  //     animaSlider2.pause()
  //     animaBar2.pause()
  //   }
  // })
  
  return [animaSlider0, animaSlider1, animaSlider2, animaBar0, animaBar1, animaBar2];
}

const barAnima1 = () => {
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
};

export const carouselControl = () => {
  const animaSlider = carouselInfinite();
  
  const [animaSlider0, animaSlider1, animaSlider2, animaBar0, animaBar1, animaBar2] = animaSlider;
  animaSlider0.play();
  animaBar0.play();

  btnLeft.addEventListener('click', () => {
    moveLeft(animaSlider);
  });
  btnRight.addEventListener('click', () => {
    moveRight(animaSlider)});
  
  // listCarousel.addEventListener('mouseout', () => {
  //   if (animaSlider0.playState === 'paused') {
  //     animaSlider0.play();
  //     animaBar0.play()
  //   }
  //   if (animaSlider1.playState === 'paused') {
  //     animaSlider1.play();
  //     animaBar1.play()
  //   }
  //   if (animaSlider2.playState === 'paused') {
  //     animaSlider2.play();
  //     animaBar2.play()
  //   }
  // })

};
