import SliderModel from '../model/slider-model';
import FlagViewRange from './flag-view-range';

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
  view: 'horizontal'
};

const model = new SliderModel(main, state);
const flag = new FlagViewRange(model);

test('spyOn mouseDown flag range', () => {
  const somethingSpy = jest.spyOn(flag, 'handleFlagMouseDown');
  let evt: any;
  flag.handleFlagMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(flag.element).toMatchSnapshot()
})