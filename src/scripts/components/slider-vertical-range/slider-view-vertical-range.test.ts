import SliderModel from '../model/slider-model';
import SliderViewVerticalRange from './slider-view-vertical-range';

const model = new SliderModel();
const slider = new SliderViewVerticalRange(model);

test('spyOn mouseDown toggle vertical range', () => {
  const somethingSpy = jest.spyOn(slider, 'bind').mockImplementation();
  slider.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});