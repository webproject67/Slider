const slider1 = $('#slider').slider();
$('#slider').panel(slider1);

const slider2 = $('#slider2').slider({
  min: 10,
  max: 50,
  step: 10,
  range: true,
  progress: false,
});
$('#slider2').panel(slider2);

const slider3 = $('.js-dog').slider({ view: true });
$('.js-dog').panel(slider3);

const slider4 = $('.js-cat').slider({
  view: true,
  range: true,
  flag: false,
  scale: false,
});
$('.js-cat').panel(slider4);
