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
  view: 'horizontal'
};

const model = new SliderModel(main, state);
const scale = new ScaleViewVertical(model);

test('spyOn click scale vertical', () => {
  const somethingSpy = jest.spyOn(scale, 'scaleClick');
  let evt: any;
  scale.scaleClick(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(scale.element).toMatchSnapshot()
})