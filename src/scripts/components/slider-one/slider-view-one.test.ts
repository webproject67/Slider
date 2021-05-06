import SliderModel from '../model/slider-model';
import SliderViewOne from './slider-view-one';

const model = new SliderModel();
const slider = new SliderViewOne(model);

test('spyOn mouseDown toggle one', () => {
  const somethingSpy = jest.spyOn(slider, 'bind').mockImplementation();
  slider.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});