import SliderModel from '../model/slider-model';
import ScaleViewVertical from './scale-view-vertical';

const model = new SliderModel();
const scale = new ScaleViewVertical(model);

test('spyOn click scale vertical', () => {
  const somethingSpy = jest.spyOn(scale, 'bind').mockImplementation();
  scale.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});