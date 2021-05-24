import SliderModel from '../model/slider-model';
import ScaleViewVertical from './scale-view-vertical';

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
  view: 'vertical'
};

const model = new SliderModel(main, state);
const scale = new ScaleViewVertical(model);

test('spyOn click scale vertical', () => {
  const somethingSpy = jest.spyOn(scale, 'handleItemClick');
  let evt: any;
  scale.handleItemClick(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots from element', () => {
  expect(scale.element).toMatchSnapshot()
})

it('jest snapshots from new element', () => {
  expect(scale.newElement).toMatchSnapshot()
})

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
  view: 'vertical'
};

const otherModel = new SliderModel(otherMain, otherState);
const otherScale = new ScaleViewVertical(otherModel);

it('jest snapshots from other element', () => {
  expect(otherScale.element).toMatchSnapshot()
})