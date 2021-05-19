import SliderModel from '../model/slider-model';
import FlagViewOne from './flag-view-one';

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
  view: 'horizontal'
};

const model = new SliderModel(main, state);
const flag = new FlagViewOne(model);

test('spyOn mouseDown flag one', () => {
  const somethingSpy = jest.spyOn(flag, 'onFlagMouseDown');
  let evt: any;
  flag.onFlagMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(flag.element).toMatchSnapshot()
})