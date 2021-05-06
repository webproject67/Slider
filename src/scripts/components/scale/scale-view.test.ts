import SliderModel from '../model/slider-model';
import ScaleView from './scale-view';

const model = new SliderModel();
const scale = new ScaleView(model);

test('spyOn click scale', () => {
  const somethingSpy = jest.spyOn(scale, 'bind').mockImplementation();
  scale.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});