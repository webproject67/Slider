import SliderModel from '../model/slider-model';
import SliderViewRange from './slider-view-range';

const model = new SliderModel();
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