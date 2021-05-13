import Slider from '../../../scripts/components/presenter/slider-presenter';

new Slider().init({});

new Slider().init({
  main: '#slider2',
  range: 'range',
  min: 10,
  max: 50,
  step: 10
});

new Slider().init({
  main: '.sabakA',
  view: 'vertical'
});

new Slider().init({
  main: '.cat',
  view: 'vertical',
  range: 'range',
  flag: false,
  scale: false
});