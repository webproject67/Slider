import SliderModel from '../model/slider-model';
import ConfiguringViewOne from './configuring-view-one';

const main = document.createElement('div');
main.id = 'slider'
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
  view: 'horizontal'
};

const model = new SliderModel(main, state);
const configuring = new ConfiguringViewOne(model);

test('spyOn change input', () => {
  const somethingSpy = jest.spyOn(configuring, 'handleInputChange');
  let evt: any;
  configuring.handleInputChange(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots from element', () => {
  expect(configuring.element).toMatchSnapshot()
})

it('jest snapshots from new element', () => {
  expect(configuring.newElement).toMatchSnapshot()
})

const otherMain = document.createElement('div');
otherMain.id = 'slider'
const otherState = {
  flag: false,
  from: -10000,
  fromPercent: 0,
  max: 100,
  min: 0,
  range: 'range',
  scale: false,
  step: 1,
  to: 100,
  toPercent: 100,
  view: 'vertical'
};

const otherModel = new SliderModel(otherMain, otherState);
const otherConfiguring = new ConfiguringViewOne(otherModel);

it('jest snapshots from other element', () => {
  expect(otherConfiguring.element).toMatchSnapshot()
})