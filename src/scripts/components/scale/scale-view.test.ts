import SliderModel from '../model/slider-model';
import ScaleView from './scale-view';

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
const scale = new ScaleView(model);

test('spyOn click scale', () => {
  const somethingSpy = jest.spyOn(scale, 'onScaleClick');
  let evt: any;
  scale.onScaleClick(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(scale.element).toMatchSnapshot()
})