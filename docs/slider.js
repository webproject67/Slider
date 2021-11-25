const slider1 = $('#slider').slider();
slider1.showConfiguringPanel();

const slider2 = $('#slider2').slider({
  range: 'range',
  min: 10,
  max: 50,
  step: 10,
  progress: false,
});
slider2.showConfiguringPanel();

const slider3 = $('.js-sabakA').slider({ view: 'vertical' });
slider3.showConfiguringPanel();

const slider4 = $('.js-cat').slider({
  view: 'vertical',
  range: 'range',
  flag: false,
  scale: false,
});
slider4.showConfiguringPanel();
