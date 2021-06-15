import SliderModel from '../model/slider-model';
import SliderViewVerticalRange from './slider-view-vertical-range';

const main = document.createElement('div');
const state = {
  flag: true,
  from: -10000,
  fromPercent: 0,
  max: 100,
  min: 0,
  range: 'range',
  scale: true,
  step: 1,
  to: -10000,
  toPercent: 100,
  view: 'vertical',
};

const model = new SliderModel(main, state);
const slider = new SliderViewVerticalRange(model);

test('spyOn mouseDown toggle vertical range', () => {
  const somethingSpy = jest.spyOn(slider, 'handleToggleMouseDown');
  let evt: any;
  slider.handleToggleMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1);
});

it('jest snapshots from element', () => {
  expect(slider.element).toMatchSnapshot();
});

it('jest snapshots from new element', () => {
  expect(slider.newElement).toMatchSnapshot();
});
