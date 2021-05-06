import SliderModel from '../model/slider-model';
import SliderViewRange from './slider-view-range';

const model = new SliderModel();
const slider = new SliderViewRange(model);

test('spyOn mouseDown toggle range', () => {
  const somethingSpy = jest.spyOn(slider, 'bind').mockImplementation();
  slider.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});