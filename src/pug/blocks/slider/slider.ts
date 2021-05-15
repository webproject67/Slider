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

$('.sabakA').slider({
  view: 'vertical'
});

$('.cat').slider({
  view: 'vertical',
  range: 'range',
  flag: false,
  scale: false
});