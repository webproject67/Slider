interface JQuery {
  slider({}): JQuery
}

$('#slider').slider({});

$('#slider2').slider({
  range: 'range',
  min: 10,
  max: 50,
  step: 10
});

$('.js-sabakA').slider({
  view: 'vertical'
});

$('.js-cat').slider({
  view: 'vertical',
  range: 'range',
  flag: false,
  scale: false
});