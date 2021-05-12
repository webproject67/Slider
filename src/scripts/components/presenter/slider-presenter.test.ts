import Slider from './slider-presenter';

it('set null object, return standart state', () => {
  const presenter = new Slider();
  presenter.init({})
  expect(presenter.sliderModel.state).toMatchObject(presenter.sliderModel.state)
});

it('set new object, return new state', () => {
  const presenter = new Slider();
  presenter.init({
    min: 28,
    max: 147,
    range: 'range',
    view: 'vertical'
  })

  const newState = {
    flag: true,
    from: -10000,
    fromPercent: 0,
    main: '#slider',
    max: 147,
    min: 28,
    range: 'range',
    scale: true,
    step: 1,
    to: -10000,
    toPercent: 100,
    view: 'vertical'
  };

  expect(presenter.sliderModel.state).toMatchObject(newState)
});