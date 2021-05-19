import SliderModel from '../model/slider-model';
import ConfiguringViewRange from './configuring-view-range';

const main = document.createElement('div');
main.id = 'slider'
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
  view: 'horizontal'
};

const model = new SliderModel(main, state);
const configuring = new ConfiguringViewRange(model);

test('spyOn change input', () => {
  const somethingSpy = jest.spyOn(configuring, 'onInputChange');
  let evt: any;
  configuring.onInputChange(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(configuring.element).toMatchSnapshot()
})