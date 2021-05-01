import Slider from '../../../scripts/components/presenter/slider-presenter';

new Slider().init({});

new Slider().init({
  main: '#slider2',
  min: 10,
  max: 50,
  step: 10,
  range: 'range'
});

new Slider().init({
  main: '.sabakA',
  view: 'vertical',
  flag: false,
  scale: false
});