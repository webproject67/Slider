import SliderModel from '../model/slider-model';
import SliderViewVerticalRange from './slider-view-vertical-range';

const model = new SliderModel();
const slider = new SliderViewVerticalRange(model);

test('spyOn mouseDown toggle vertical range', () => {
  const somethingSpy = jest.spyOn(slider, 'toggleMouseDown');
  let evt: any;
  slider.toggleMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(slider.element).toMatchSnapshot()
})