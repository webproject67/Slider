import SliderModel from '../model/slider-model';
import ScaleView from './scale-view';

const main = document.createElement('div');
const state = {
  flag: true,
  from: -10000,
  fromPercent: 0,
  max: 100,
  min: 0,
  range: 'one',
  scale: true,
  step: 1,
  to: -10000,
  toPercent: 100,
  view: 'horizontal',
};

const model = new SliderModel(main, state);
const scale = new ScaleView(model);

it('jest snapshots from element', () => {
  expect(scale.element).toMatchSnapshot();
});

it('jest snapshots from new element', () => {
  expect(scale.newElement).toMatchSnapshot();
});

const otherMain = document.createElement('div');
const otherState = {
  flag: true,
  from: -10000,
  fromPercent: 0,
  max: 100,
  min: 1,
  range: 'one',
  scale: true,
  step: 2,
  to: -10000,
  toPercent: 100,
  view: 'horizontal',
};

const otherModel = new SliderModel(otherMain, otherState);
const otherScale = new ScaleView(otherModel);

it('jest snapshots from other element', () => {
  expect(otherScale.element).toMatchSnapshot();
});
