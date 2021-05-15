import SliderModel from '../model/slider-model';
import SliderViewRange from './slider-view-range';

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
const slider = new SliderViewRange(model);

test('spyOn mouseDown toggle range', () => {
  const somethingSpy = jest.spyOn(slider, 'toggleMouseDown');
  let evt: any;
  slider.toggleMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(slider.element).toMatchSnapshot()
})