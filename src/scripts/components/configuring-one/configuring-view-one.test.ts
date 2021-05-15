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
  const somethingSpy = jest.spyOn(configuring, 'inputChange');
  let evt: any;
  configuring.inputChange(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(configuring.element).toMatchSnapshot()
})