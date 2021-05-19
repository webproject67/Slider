import SliderModel from '../model/slider-model';
import SliderViewVerticalOne from './slider-view-vertical-one';

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
const slider = new SliderViewVerticalOne(model);

test('spyOn mouseDown toggle vertical one', () => {
  const somethingSpy = jest.spyOn(slider, 'onToggleMouseDown');
  let evt: any;
  slider.onToggleMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(slider.element).toMatchSnapshot()
})