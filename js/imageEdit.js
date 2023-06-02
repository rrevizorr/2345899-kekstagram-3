const scale = document.querySelector('.scale__control--value');
let scaleValueNumber = Number(scale.value.replace('%', ''));
const increaseButton = document.querySelector('.scale__control--bigger');
const decreaseButton = document.querySelector('.scale__control--smaller');
const imgUploadPreview = document.querySelector('.img-upload__preview');
imgUploadPreview.style.setProperty('transform','scale(1.0)');
let styleValueNumber = imgUploadPreview.style.getPropertyValue('transform').replace(/\D/g,'');
const filtersLabels = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementValue = document.querySelector('.effect-level__value');
let sliderValue;
let currentEffect = 'original';
const filters = {
  'chrome': {
    min: 0,
    max: 1,
    name: 'grayscale',
    step: 0.1,
    measure: ''
  },
  'sepia' : {
    min: 0,
    max: 1,
    name: 'sepia',
    step: 0.1,
    measure: ''
  },
  'marvin': {
    min: 0,
    max: 100,
    name: 'invert',
    step: 1,
    measure: '%'
  },
  'phobos': {
    min: 0,
    max: 3,
    name: 'blur',
    step: 0.1,
    measure: 'px'
  },
  'heat': {
    min: 1,
    max: 3,
    name: 'brightness',
    step: 0.1,
    measure: ''
  }
};

filtersLabels.forEach( (element) => {
  element.addEventListener('click', () => {
    setEffect(element.value);
  });
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});
sliderElement.setAttribute('hidden', true);

function setEffect(effect, flag) {
  const image = imgUploadPreview.querySelector('img');
  if (effect === 'original') {
    sliderElement.setAttribute('hidden', true);
    image.className = '';
    image.style.filter = '';
    return;
  }
  const {max, step, measure, name, min} = filters[effect];
  if (!flag) {
    image.style.setProperty('filter', `${name}(${max}${measure})`);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: max,
      step: step
    });
    sliderElement.removeAttribute('hidden', true);
    image.className = '';
    image.classList.add(`effects__preview--${effect}`);
    currentEffect = effect;
  }
  else {
    image.style.filter = `${name}(${sliderValue}${measure})`;
  }
}

sliderElement.noUiSlider.on('slide', () => {
  sliderElementValue.value = sliderElement.noUiSlider.get();
  sliderValue = sliderElement.noUiSlider.get();
  setEffect(currentEffect, true);
});

function increaseScale() {
  if (scaleValueNumber === 100) {
    return;
  }
  styleValueNumber += 0.25;
  scaleValueNumber += 25;
  scale.value = `${scaleValueNumber}%`;
  imgUploadPreview.style.setProperty('transform',`scale(${styleValueNumber})`);
}

function decreaseScale() {
  if (scaleValueNumber === 25) {
    return;
  }
  styleValueNumber -= 0.25;
  scaleValueNumber -= 25;
  scale.value = `${scaleValueNumber}%`;
  imgUploadPreview.style.setProperty('transform',`scale(${styleValueNumber})`);
}

increaseButton.addEventListener('click', increaseScale);
decreaseButton.addEventListener('click', decreaseScale);

export { setEffect };
