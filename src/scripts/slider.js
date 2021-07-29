const slider1 = $('#slider').slider();
slider1.slider('getConfiguring');

const slider2 = $('#slider2').slider({
  range: 'range',
  min: 10,
  max: 50,
  step: 10,
  progress: false,
});
slider2.slider('getConfiguring');

const slider3 = $('.js-sabakA').slider({ view: 'vertical' });
slider3.slider('getConfiguring');

const slider4 = $('.js-cat').slider({
  view: 'vertical',
  range: 'range',
  flag: false,
  scale: false,
});
slider4.slider('getConfiguring');
