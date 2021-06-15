import SliderModel from '../model/slider-model';
import FlagViewVerticalRange from './flag-view-vertical-range';

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
const flag = new FlagViewVerticalRange(model);

test('spyOn mouseDown flag vertical range', () => {
  const somethingSpy = jest.spyOn(flag, 'handleFlagMouseDown');
  let evt: any;
  flag.handleFlagMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1);
});

it('jest snapshots from element', () => {
  expect(flag.element).toMatchSnapshot();
});

it('jest snapshots from new element', () => {
  expect(flag.newElement).toMatchSnapshot();
});

const otherMain = document.createElement('div');
const otherState = {
  flag: true,
  from: 1,
  fromPercent: 0,
  max: 100,
  min: 1,
  range: 'one',
  scale: true,
  step: 1,
  to: 100,
  toPercent: 100,
  view: 'vertical',
};

const otherModel = new SliderModel(otherMain, otherState);
const otherFlag = new FlagViewVerticalRange(otherModel);

it('jest snapshots from other element', () => {
  expect(otherFlag.element).toMatchSnapshot();
});
