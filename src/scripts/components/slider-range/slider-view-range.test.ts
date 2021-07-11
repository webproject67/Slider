import SliderModel from '../model/slider-model';
import SliderViewRange from './slider-view-range';

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
  view: 'horizontal',
};

const model = new SliderModel(main, state);
const slider = new SliderViewRange(model);

it('jest snapshots from element', () => {
  expect(slider.element).toMatchSnapshot();
});

it('jest snapshots from new element', () => {
  expect(slider.newElement).toMatchSnapshot();
});
